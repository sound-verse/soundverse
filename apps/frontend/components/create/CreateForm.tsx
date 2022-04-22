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

const FILE_SIZE = 100000000

export const SUPPORTED_FORMATS_PICTURE = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
]

export const SUPPORTED_FORMATS_MUSIC = ['audio/mpeg', 'audio/wav']

export const CreateForm = () => {
  const [nftFile, setNftFile] = useState<File>(undefined)
  const [pictureFile, setPictureFile] = useState<File>(undefined)
  const [showing, setShowing] = useState<Boolean>(false)
  const router = useRouter()
  const { prepareMint } = useCreateNFT()
  const [nftFileError, setNftFileError] = useState<String>('')
  const [pictureFileError, setPictureFileError] = useState<String>('')

  const initialValues = {
    name: '',
    description: '',
    tags: [],
    licenses: 2,
    royaltyFeeInBeeps: 0,
  }

  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File>>,
    setFileError: React.Dispatch<React.SetStateAction<String>>,
    supportedFormats: string[]
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

    setFile(file)
    setFileError('')
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter a title'),
    description: Yup.string()
      .required('Please enter a description')
      .max(1000, 'Maximum number of characters of 1000 exceeded'),
    licenses: Yup.number()
      .typeError('Please enter a number')
      .min(2, 'You have to set a minium of 2 licenses')
      .max(100000, 'You can only set a maximum of 100.000 licenses')
      .required('Please enter a number'),
    royaltyFeeInBeeps: Yup.number()
      .typeError('Please enter a number')
      .max(100, 'You can enter a number up to 100')
      .required('Please enter a number'),
  })

  const onSubmit = async (values, onSubmitProps) => {
    if (!nftFile) {
      setNftFileError('Please select a music file')
      return
    }

    if (!pictureFile) {
      setPictureFileError('Please select a picture file')
      return
    }
    try {
      setShowing(true)
      const { id } = await prepareMint({
        nftFile,
        pictureFile,
        name: values.name,
        description: values.description,
        licenses: values.licenses,
        royaltyFeeInBeeps: values.royaltyFeeInBeeps,
      })
      if (id) {
        router.push(`/master/${id}`)
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

  return (
    <>
      <div className="rounded-3xl bg-grey-dark max-w-2xl p-20 mx-auto mt-12 mb-36">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form>
            <div className="flex flex-col">
              <div className="text-white font-bold text-base">Track</div>
              <div>
                <label
                  htmlFor="nftFile"
                  className="text-white border-2 border-white text-sm rounded-full p-2 mt-5 inline-block cursor-pointer px-28 whitespace-nowrap"
                >
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
                      SUPPORTED_FORMATS_MUSIC
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
                <label
                  htmlFor="pictureFile"
                  className="text-white border-2 text-sm border-white rounded-full p-2 mt-5 inline-block cursor-pointer px-36 whitespace-nowrap"
                >
                  Choose Nft Cover Picture
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
                      SUPPORTED_FORMATS_PICTURE
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
              <div className="text-white font-bold text-sm mt-10">
                Track Name
              </div>
              <div className="mt-3 w-full">
                <Field
                  id="name"
                  name="name"
                  placeholder="Ice in the dark..."
                  className="outline-none bg-grey-dark text-white w-full"
                />
                <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                <div className="text-grey-light mt-2 text-xs">
                  max. 20 characters
                </div>
                <div className={styles.error}>
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="text-white font-bold text-sm mt-10">Licenses</div>
              <div className="mt-3 w-full">
                <Field
                  id="licenses"
                  name="licenses"
                  placeholder="2"
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
              <div className="text-white font-bold text-sm mt-10">
                Royaylty Fees
              </div>
              <div className="mt-3 w-full">
                <Field
                  id="royaltyFeeInBeeps"
                  name="royaltyFeeInBeeps"
                  placeholder="2"
                  className="outline-none bg-grey-dark text-white w-full"
                />
                <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                <div className="text-grey-light mt-2 text-xs">
                  Enter a number between 0 and 100
                </div>
                <div className={styles.error}>
                  <ErrorMessage name="royaltyFeeInBeeps" />
                </div>
              </div>
              <div className="text-white font-bold text-sm mt-10">
                Description
              </div>
              <div className="mt-3">
                <Field
                  type="input"
                  as="textarea"
                  name="description"
                  className="w-full text-white bg-transparent border-2 rounded-3xl p-5 text-sm"
                  id="trac-desc"
                  placeholder="I am ..."
                  rows={8}
                  cols={50}
                ></Field>
                <div className={styles.error}>
                  <ErrorMessage name="description" />
                </div>
              </div>
              <button
                className="text-white cursor-pointer rounded-full bg-purple px-24 py-4 ml-auto mt-10 font-bold text-sm"
                type="submit"
              >
                Mint
              </button>
            </div>
          </Form>
        </Formik>
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
