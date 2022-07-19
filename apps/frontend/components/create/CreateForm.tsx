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
}

interface SecondStepValues {
  licenses: number
  royaltyFeeMaster: number
  creatorOwnerSplit: number
}

export const SUPPORTED_FORMATS_MUSIC = ['audio/mpeg', 'audio/wav']

export const CreateForm = () => {
  const [nftFile, setNftFile] = useState<File>(undefined)
  const [nftWaveForm, setNftWaveForm] = useState<[number]>([0])
  const [nftDuration, setNftDuration] = useState<number>(0)
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

  const initialValuesFirstStep: FirstStepValues = {
    name: '',
    description: '',
    tags: [],
  }

  const initialValuesSecondStep: SecondStepValues = {
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
        function (buffer) {
          const duration = buffer.duration
          setNftDuration(duration)
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
    name: Yup.string().required('Please enter a title'),
    description: Yup.string()
      .required('Please enter a description')
      .max(1000, 'Maximum number of characters of 1000 exceeded'),
  })

  const validationSchemaSecondStep = Yup.object().shape({
    licenses: Yup.number()
      .typeError('Please enter a number')
      .min(2, 'You have to set a minium of 2 licenses')
      .max(100000, 'You can only set a maximum of 100.000 licenses')
      .required('Please enter a number'),
    royaltyFeeMaster: Yup.number()
      .typeError('Please enter a number')
      .max(50, 'You can enter a number up to 50')
      .required('Please enter a number'),
    creatorOwnerSplit: Yup.number()
      .typeError('Please enter a number')
      .max(100, 'You can enter a number up to 100')
      .required('Please enter a number'),
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
          <div className="text-white font-bold text-sm">Track</div>
          <div>
            <label htmlFor="nftFile" className={styles.buttonStyle}>
              Choose Music File
            </label>
            <Field
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
            ></Field>
            <div className="text-grey-light mt-3 text-xs">
              MP3, WAVE - Max 100Mb
            </div>
            <div className="text-grey-light text-xs">
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
            <div className="text-grey-light mt-3 text-xs">
              JPG, PNG - Max 100Mb
            </div>
          </div>
          <div className="text-grey-light text-xs">
            {pictureFile && `Selected File: ${pictureFile.name}`}
          </div>
          <div className={styles.error}>{pictureFileError}</div>
          <div className="text-white font-bold text-sm mt-10">Track Name</div>
          <div className="mt-3 w-full">
            <Field
              id="name"
              name="name"
              placeholder="Ice in the dark..."
              className="outline-none bg-grey-dark text-white w-full text-sm"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-light mt-2 text-xs">
              max. 20 characters
            </div>
            <div className={styles.error}>
              <ErrorMessage name="name" />
            </div>
          </div>
          <div className="text-white font-bold text-sm mt-10">Description</div>
          <div className="mt-3 text-sm">
            <Field
              type="input"
              as="textarea"
              name="description"
              className={styles.descriptionField}
              id="trac-desc"
              placeholder="I am ..."
              rows={8}
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
          className="text-white mb-10 cursor-pointer"
          onClick={() => setShowSecondStep(false)}
        >
          {'<-'} Back
        </div>
        <div className="flex flex-col text-sm text-white">
          <div className="font-bold mb-2">
            Royalty Settings for secondary sales of Master and Licenses
          </div>
          <div className="text-grey-light leading-6">
            Set the royalty percentage you would like to receive on every
            secondary trade of your Master and Licences.{' '}
            <span className="text-purple underline">
              Caution: You {"won't"} be able to change this royalty percentage
              after minting your NFT!
            </span>
          </div>
          <div className="text-white font-bold text-sm mt-10">
            Secondary royalty
          </div>
          <div className="mt-6 w-full">
            <Field
              id="royaltyFeeMaster"
              name="royaltyFeeMaster"
              placeholder="5%, 10%, 15%, ..."
              className="outline-none bg-grey-dark text-white w-full"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-light mt-2 text-xs">
              5-15% are industry standards - Max is 50%
              <div className={styles.error}>
                <ErrorMessage name="royaltyFeeMaster" />
              </div>
            </div>
          </div>
          <div className="text-white font-bold text-sm mt-10">Licenses</div>
          <div className="mt-3 w-full">
            <Field
              id="licenses"
              name="licenses"
              placeholder="10000"
              className="outline-none bg-grey-dark text-white w-full"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-light mt-2 text-xs">
              min. 2 - max. 100.000
            </div>
            <div className={styles.error}>
              <ErrorMessage name="licenses" />
            </div>
          </div>
          <div className="text-white font-bold text-sm mt-10 mb-2">
            Secondary sales distribution
          </div>
          <div className="text-grey-light leading-6">
            You as the Master NFT creator will receive this % income from secondary
            sales of your License NFTs. By default you are the Master NFT creator and owner -
            you can either sell it or keep it for yourself.
          </div>
          <div className="mt-6 w-full">
            <Field
              id="creatorOwnerSplit"
              name="creatorOwnerSplit"
              placeholder="30"
              className="outline-none bg-grey-dark text-white w-full"
            />
            <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
            <div className="text-grey-light mt-2 text-xs">
              Example: if you type in 30, 30% will go to the creator and 70%
              will go to the owner of this Master NFT. Max value 100.
              <div className={styles.error}>
                <ErrorMessage name="creatorOwnerSplit" />
              </div>
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
          Your Master is a unique 1/1 valuable NFT. The owner of your Master
          will initially own all the unsold Licenses and get royalties on every
          trade on each License.
        </div>
      </div>
      <div className={cn(styles.informationStepContent, 'mt-10')}>
        <div className={styles.informationStepHeader}>License NFT</div>
        <div className={styles.informationStepBody}>
          All your License NFTs belong to the owner of the Master NFT initially.
          Your fans can use, buy, trade, collect or monetize your Licenses and
          everytime they earn money with them, the creator and Master owner will
          also earn money with them automatically.
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className={styles.stepWrapper}>
        <div className={styles.wrapperStyle}>
          {!showSecondStep ? renderFirstStep() : renderSecondStep()}
        </div>
        {!showSecondStep
          ? renderInformationFirstStep()
          : renderInformationSecondStep()}
        <div ref={waveformRef} />
      </div>
      <Modal
        isOpen={showing}
        contentLabel="onRequestClose Example"
        className="flex justify-center items-center h-full"
      >
        <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-white text-3xl font-bold mb-10">Minting</div>
            <Bars color="#7A64FF" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </>
  )
}
