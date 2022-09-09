import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useCreateNFT } from '../../hooks/contracts/useCreateNFT'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { Bars } from 'react-loader-spinner'
import styles from './CreateForm.module.css'
import cn from 'classnames'
import { useLogin } from '../../hooks/useLogin'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const FILE_SIZE = 100000000

export const SUPPORTED_FORMATS_PICTURE = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
]

interface FirstStepValues {
  name: string
  description: string
  tags: string[]
  bpm: number
  genre: string
}

interface SecondStepValues {
  acceptTerms: boolean
  licenses: number
  royaltyFeeMaster: number
  creatorOwnerSplit: number
}

export const SUPPORTED_FORMATS_MUSIC = ['audio/mpeg', 'audio/wav']

export const CreateForm = () => {
  const [nftFile, setNftFile] = useState<File>(undefined)
  const [nftWaveForm, setNftWaveForm] = useState<[number]>([0])
  const [nftDuration, setNftDuration] = useState<number>(0)
  const [bpm, setBpm] = useState<number>(0)
  const [pictureFile, setPictureFile] = useState<File>(undefined)
  const [showing, setShowing] = useState<Boolean>(false)
  const router = useRouter()
  const { prepareMint } = useCreateNFT()
  const [nftFileError, setNftFileError] = useState<String>('')
  const [pictureFileError, setPictureFileError] = useState<String>('')
  const [firstStepValues, setFirstStepValues] = useState<FirstStepValues>()
  const [showSecondStep, setShowSecondStep] = useState(false)
  const { authenticated } = useLogin()
  const WavesurferLibrary = useRef(null)
  const waveformRef = useRef(null)
  const { isMobile } = useWindowDimensions()
  const DetectLibrary = useRef(null)

  const initialValuesFirstStep: FirstStepValues = {
    name: '',
    description: '',
    tags: [],
    bpm: bpm,
    genre: '',
  }

  const initialValuesSecondStep: SecondStepValues = {
    acceptTerms: false,
    licenses: undefined,
    royaltyFeeMaster: undefined,
    creatorOwnerSplit: undefined,
  }

  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File>>,
    setFileError: React.Dispatch<React.SetStateAction<String>>,
    supportedFormats: string[],
    type: 'nft' | 'picture'
  ) => {
    const fileSize = e.target.files[0].size
    const fileType = e.target.files[0].type
    const file = e.target.files[0]

    if (fileSize > FILE_SIZE) {
      setFileError('Your selected file is too large')
      return
    }

    if (!supportedFormats.includes(fileType)) {
      setFileError('Your selected file type is not supported')
      return
    }

    if (type === 'picture') {
      setFile(file)
      setFileError('')
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const audioContext = new window.AudioContext()

      if (!audioContext) {
        return
      }

      audioContext.decodeAudioData(
        event.target.result as any,
        async function (buffer) {
          const duration = buffer.duration
          setNftDuration(duration)
          try {
            if (typeof window !== 'undefined') {
              if (!DetectLibrary.current) {
                DetectLibrary.current = await (
                  await import('bpm-detective')
                ).default
              }
              const bpm = DetectLibrary.current(buffer)
              setBpm(bpm)
            }
          } catch {
            setBpm(0)
            console.log('BPM could not be analysed')
          }
          processWaveForm(file)
          setFile(file)
          setFileError('')
        }
      )
    }

    reader.onerror = (event) => {
      console.log(event)
    }

    reader.readAsArrayBuffer(file)
  }

  const processWaveForm = async (file: File) => {
    if (!WavesurferLibrary.current) {
      WavesurferLibrary.current = await (await import('wavesurfer.js')).default
    }

    const wavesurfer = await WavesurferLibrary.current.create({
      container: waveformRef.current,
    })

    const reader = new FileReader()

    reader.onload = (event) => {
      const blob = new window.Blob([new Uint8Array(event.target.result as any)])
      const audio = new Audio()
      audio.src = URL.createObjectURL(blob)
      wavesurfer.load(audio)
    }

    reader.onerror = (error) => {
      console.log(error)
    }

    reader.readAsArrayBuffer(file)

    wavesurfer.on('ready', function () {
      setNftWaveForm(wavesurfer.backend.getPeaks(100))
    })
  }

  const validationSchemaFirstStep = Yup.object().shape({
    name: Yup.string().required('Enter a title'),
    description: Yup.string()
      .required('Enter a description')
      .max(1000, 'Maximum number of characters of 1000 exceeded'),
    bpm: Yup.number()
      .min(40, 'Only BPM above 40 is allowed')
      .max(200, 'Only BPM below 200 is allowed')
      .required('Provide the correct BPM if not self detected'),
    genre: Yup.string().required('Provide a genre'),
  })

  const validationSchemaSecondStep = Yup.object().shape({
    acceptTerms: Yup.bool().oneOf(
      [true],
      'Accept Terms and Conditions is required'
    ),
    licenses: Yup.number()
      .typeError('Enter a number')
      .min(2, 'You have to set a minium of 2 licenses')
      .max(100000, 'You can only set a maximum of 100.000 licenses')
      .required('Enter a number'),
    royaltyFeeMaster: Yup.number()
      .typeError('Enter a number')
      .max(50, 'You can enter a number up to 50')
      .required('Enter a number'),
    creatorOwnerSplit: Yup.number()
      .typeError('Enter a number')
      .max(100, 'You can enter a number up to 100')
      .required('Enter a number'),
  })

  const submitFirstStep = (values) => {
    if (!nftFile) {
      setNftFileError('Please select a music file')
      return
    }

    if (!pictureFile) {
      setPictureFileError('Please select a picture file')
      return
    }

    setFirstStepValues(values)
    setShowSecondStep(true)
  }

  const onSubmit = async (values, onSubmitProps) => {
    if (!authenticated) {
      toast.error('Please connect your wallet.')
      return
    }
    try {
      setShowing(true)
      const { id } = await prepareMint({
        nftFile,
        pictureFile,
        name: firstStepValues.name,
        description: firstStepValues.description,
        licenses: values.licenses,
        royaltyFeeMaster: values.royaltyFeeMaster,
        royaltyFeeLicense: values.royaltyFeeMaster,
        creatorOwnerSplit: values.creatorOwnerSplit,
        trackDuration: nftDuration,
        soundWave: nftWaveForm,
        bpm,
        genre: firstStepValues.genre,
      })
      if (id) {
        router.push(`/license/${id}`)
      } else {
        toast.error('Error minting your NFT')
      }
      setShowing(false)
    } catch (error) {
      setShowing(false)
      console.log(error)
      toast.error('Error minting your NFT')
    }

    onSubmitProps.setSubmitting(false)
  }

  Modal.setAppElement('#__next')

  const renderFirstStep = () => (
    <Formik
      initialValues={initialValuesFirstStep}
      validationSchema={validationSchemaFirstStep}
      onSubmit={submitFirstStep}
      enableReinitialize
    >
      <Form>
        <div className="flex flex-col">
          <div className="text-black font-bold text-sm">Track</div>
          <div>
            <label htmlFor="nftFile" className={styles.buttonStyle}>
              Choose Music File
            </label>
            <input
              type="file"
              id="nftFile"
              name="nftFile"
              className="hidden"
              onChange={(e) =>
                onFileChange(
                  e,
                  setNftFile,
                  setNftFileError,
                  SUPPORTED_FORMATS_MUSIC,
                  'nft'
                )
              }
            ></input>
            <div className="text-grey-dark mt-3 text-xs">
              MP3, WAVE - Max 100Mb
            </div>
            <div className="text-grey-dark text-xs">
              {nftFile && `Selected File: ${nftFile.name}`}
            </div>
            <div className={styles.error}>{nftFileError}</div>
          </div>
          <div>
            <label htmlFor="pictureFile" className={styles.buttonStyle}>
              Choose Cover Picture
            </label>
            <input
              type="file"
              id="pictureFile"
              name="pictureFile"
              className="hidden"
              onChange={(e) =>
                onFileChange(
                  e,
                  setPictureFile,
                  setPictureFileError,
                  SUPPORTED_FORMATS_PICTURE,
                  'picture'
                )
              }
            ></input>
            <div className="text-grey-dark mt-3 text-xs">
              JPG, PNG - Max 100Mb
            </div>
          </div>
          <div className="text-grey-dark text-xs">
            {pictureFile && `Selected File: ${pictureFile.name}`}
          </div>
          <div className={styles.error}>{pictureFileError}</div>
          <div className="text-black font-bold text-sm mt-10">Track Name</div>
          <div className="mt-3 w-full mb-5">
            <Field
              id="name"
              name="name"
              placeholder="Ice in the dark..."
              className="outline-none text-black w-full text-sm"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-dark mt-2 text-xs">
              max. 20 characters
            </div>
            <div className={styles.error}>
              <ErrorMessage name="name" />
            </div>
          </div>
          <div className="text-black font-bold text-sm">Track BPM</div>
          <div className="mt-3 mb-5 w-full">
            <Field
              id="bpm"
              name="bpm"
              placeholder={bpm}
              className="outline-none text-black w-full text-sm"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            {bpm > 0 && (
              <div className="text-xs text-green-600 mt-2">
                We detected a BPM of <b>{bpm}</b> in your music file
              </div>
            )}
            <div className="text-grey-dark mt-2 text-xs">
              Allowed range 40-200 BPM
            </div>
            <div className={styles.error}>
              <ErrorMessage name="bpm" />
            </div>
          </div>
          <div className="text-black font-bold text-sm">Genre</div>
          <div className="mt-3 mb-5 w-full">
            <Field
              id="genre"
              name="genre"
              placeholder="House"
              className="outline-none text-black w-full text-sm"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-dark mt-2 text-xs">Music genre</div>
            <div className={styles.error}>
              <ErrorMessage name="genre" />
            </div>
          </div>
          <div className="text-black font-bold text-sm mt-5">Description</div>
          <div className="mt-3 text-sm text-black">
            <Field
              type="input"
              as="textarea"
              name="description"
              className={styles.descriptionField}
              id="trac-desc"
              placeholder="I am ..."
              rows={2}
              cols={50}
            ></Field>
            <div className={styles.error}>
              <ErrorMessage name="description" />
            </div>
          </div>
          <button className={styles.mintButton} type="submit">
            Next
          </button>
        </div>
      </Form>
    </Formik>
  )

  const renderSecondStep = () => (
    <Formik
      initialValues={initialValuesSecondStep}
      validationSchema={validationSchemaSecondStep}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form>
        <div
          className="text-black mb-10 cursor-pointer"
          onClick={() => setShowSecondStep(false)}
        >
          {'<-'} Back
        </div>
        <div className="flex flex-col text-sm text-black">
          <div className="text-black font-bold text-sm">
            Number of Licenses
          </div>
          <div className="mt-3 w-full">
            <Field
              id="licenses"
              name="licenses"
              placeholder="10000"
              className="outline-none text-black w-full"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-dark mt-2 text-xs">
              min. 2 - max. 100.000
            </div>
            <div className={styles.error}>
              <ErrorMessage name="licenses" />
            </div>
          </div>
          <div className="font-bold mb-2 mt-10">
            Royalty Settings for secondary sales of Master and Licenses
          </div>
          <div className="text-grey-dark leading-6">
            Set the royalty percentage you would like to receive on every
            secondary trade of your Master and Licences.{' '}
            <span className="text-purple underline">
              Caution: You {"won't"} be able to change this royalty percentage
              after minting your NFT!
            </span>
          </div>
          <div className="text-black font-bold text-sm mt-10">
            Secondary royalty
          </div>
          <div className="mt-6 w-full">
            <Field
              id="royaltyFeeMaster"
              name="royaltyFeeMaster"
              placeholder="5%, 10%, 15%, ..."
              className="outline-none text-black w-full"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-dark mt-2 text-xs">
              5-15% are industry standards - Max is 50%
              <div className={styles.error}>
                <ErrorMessage name="royaltyFeeMaster" />
              </div>
            </div>
          </div>
          <div className="text-black font-bold text-sm mt-10 mb-2">
            Master NFT Royalties Split
          </div>
          <div className="text-grey-dark leading-6">
            You as the Master NFT creator will receive this % income from
            secondary sales of your License NFTs. By default you are the Master
            NFT creator and owner - you can either sell it or keep it for
            yourself.
          </div>
          <div className="mt-6 w-full">
            <Field
              id="creatorOwnerSplit"
              name="creatorOwnerSplit"
              placeholder="30"
              className="outline-none  text-black w-full"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-dark mt-2 text-xs">
              Example: if you type in 30, 30% will go to the creator and 70%
              will go to the owner of this Master NFT. Max value 100.
              <div className={styles.error}>
                <ErrorMessage name="creatorOwnerSplit" />
              </div>
            </div>
          </div>
          <div className="mt-8 w-full ">
            <div className="flex items-baseline">
              <div className="mr-2 my-auto">
                <Field
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  className="cursor-pointer scale-125"
                />
              </div>
              <div className="text-grey-dark text-xs">
                I hereby accept the{' '}
                <a
                  href="/terms-conditions"
                  className="font-bold hover:underline cursor-pointer"
                  target={'_blank'}
                >
                  Terms and Conditions
                </a>
              </div>
            </div>
            <div className={styles.error}>
              <ErrorMessage name="acceptTerms" />
            </div>
          </div>
          <button className={styles.mintButton} type="submit">
            Mint NFT
          </button>
        </div>
      </Form>
    </Formik>
  )

  const renderInformationFirstStep = () => (
    <div className={styles.informationStepWrapper}>
      <div className={styles.informationStepContent}>
        <div className={styles.informationStepHeader}>Upload music</div>
        <div className={styles.informationStepBody}>
          You may only publish music for which you have full rights on. As soon
          as you mint your music as an NFT, your music is on the blockchain and
          no one can remove it anymore.
        </div>
      </div>
    </div>
  )

  const renderInformationSecondStep = () => (
    <div className={styles.informationStepWrapper}>
      <div className={styles.informationStepContent}>
        <div className={styles.informationStepHeader}>Master NFT</div>
        <div className={styles.informationStepBody}>
          Your Master is a unique 1 / 1 valuable NFT. The Master Holder and the
          Original Artist will split royalties from the sale of each License NFT
          in perpetuity. The holder of the Master will also own all the unsold
          Licenses.
        </div>
      </div>
      <div className={cn(styles.informationStepContent, 'mt-10')}>
        <div className={styles.informationStepHeader}>License NFT</div>
        <div className={styles.informationStepBody}>
          All License NFTs are linked to the Master NFT. Whenever someone buys a
          Master they will also own all the unsold Licenses. Your fans can use,
          buy, trade, collect or monetize your Licenses. Every time money is
          earned, the creator and Master owner will receive and split the money
          automatically.
        </div>
      </div>
    </div>
  )

  const renderInformation = () => {
    return !showSecondStep
      ? renderInformationFirstStep()
      : renderInformationSecondStep()
  }

  const renderStep = () => {
    return (
      <div className={styles.wrapperStyle}>
        {!showSecondStep ? renderFirstStep() : renderSecondStep()}
      </div>
    )
  }

  return (
    <>
      <div className={styles.stepWrapper}>
        {isMobile && renderInformation()}
        {renderStep()}
        {!isMobile && renderInformation()}
        <div ref={waveformRef} />
      </div>
      <Modal
        isOpen={showing}
        className="flex justify-center items-center h-full"
      >
        <div className="w-5/6 md:w-2/3 lg:w-1/2 h-1/2 rounded-3xl p-10 bg-white drop-shadow-2xl flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-black text-3xl font-bold mb-10">Minting</div>
            <Bars color="black" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </>
  )
}
