import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { Bars } from 'react-loader-spinner'
import styles from './EditProfileForm.module.css'
import { useProfile } from '../../hooks/useProfile'
import { LoggedInUser, useLogin } from '../../hooks/useLogin'

const FILE_SIZE = 100000000

export const SUPPORTED_FORMATS_PICTURE = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
]

export type EditProfileFormProps = {
  user: LoggedInUser
  setShowEditProfile: Dispatch<SetStateAction<boolean>>
}

export const EditProfileForm = ({
  user,
  setShowEditProfile,
}: EditProfileFormProps) => {
  const [profileImage, setProfileImage] = useState<File>(undefined)
  const [showing, setShowing] = useState<Boolean>(false)
  const [profileImageError, setProfileImageError] = useState<String>('')
  const { updateProfile } = useProfile()

  const { refetch } = useLogin()

  const initialValues = {
    name: user.name,
    description: user.description,
    twitter: user.twitter,
    instagram: user.instagram,
    soundcloud: user.soundcloud,
    discord: user.discord,
    spotify: user.spotify,
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

  const validationSchema = Yup.object().shape({})

  const onSubmit = async (
    { name, description, twitter, instagram, discord, spotify, soundcloud },
    onSubmitProps
  ) => {
    try {
      setShowing(true)
      await updateProfile({
        name,
        description,
        twitter,
        instagram,
        profileImage,
        discord,
        spotify,
        soundcloud,
      })
      setShowing(false)
      refetch()
      setShowEditProfile(false)
    } catch (error) {
      setShowing(false)
      console.log(error)
      toast.error('Error updating your profile')
    }

    onSubmitProps.setSubmitting(false)
  }

  Modal.setAppElement('#__next')

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-grey-dark rounded-3xl p-16">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            <Form>
              <div className="flex flex-col">
                <div className="text-white font-bold text-sm">
                  Profile Image
                </div>
                <div>
                  <label
                    htmlFor="profileImage"
                    className="text-white border-2 border-white rounded-full p-2 mt-5 inline-block cursor-pointer px-36 whitespace-nowrap text-sm"
                  >
                    Choose Profile Picture
                  </label>
                  <Field
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    className="hidden"
                    onChange={(e) =>
                      onFileChange(
                        e,
                        setProfileImage,
                        setProfileImageError,
                        SUPPORTED_FORMATS_PICTURE
                      )
                    }
                  ></Field>
                  <div className="text-grey-light mt-3 text-xs">
                    JPG, PNG - Max 100Mb
                  </div>
                  <div className="text-grey-light">
                    {profileImage && `Selected File: ${profileImage.name}`}
                  </div>
                  <div className={styles.error}>{profileImageError}</div>
                </div>
                <div className="text-white font-bold mt-10 text-sm">
                  Profile Name
                </div>
                <div className="mt-3">
                  <Field
                    id="name"
                    name="name"
                    placeholder="Music Rabbit"
                    className="outline-none bg-grey-dark text-white text-sm"
                  />
                  <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                  <div className="text-grey-light mt-2 text-xs">
                    max. 20 characters
                  </div>
                  <div className={styles.error}>
                    <ErrorMessage name="name" />
                  </div>
                </div>
                <div className="text-white font-bold mt-10 text-sm">
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
                <div className="text-white font-bold text-sm mt-10">
                  Twitter Handle
                </div>
                <div className="mt-3">
                  <Field
                    id="twitter"
                    name="twitter"
                    placeholder="music_rabbit"
                    className="outline-none bg-grey-dark text-white text-sm"
                  />
                  <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                  <div className={styles.error}>
                    <ErrorMessage name="twitter" />
                  </div>
                </div>
                <div className="text-white font-bold text-sm mt-10">
                  Instagram Handle
                </div>
                <div className="mt-3">
                  <Field
                    id="instagram"
                    name="instagram"
                    placeholder="music_rabbit"
                    className="outline-none bg-grey-dark text-white  text-sm"
                  />
                  <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                  <div className={styles.error}>
                    <ErrorMessage name="instagram" />
                  </div>
                </div>
                <div className="text-white font-bold text-sm mt-10">
                  Soundcloud Handle
                </div>
                <div className="mt-3">
                  <Field
                    id="soundcloud"
                    name="soundcloud"
                    placeholder="music_rabbit"
                    className="outline-none bg-grey-dark text-white text-sm"
                  />
                  <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                  <div className={styles.error}>
                    <ErrorMessage name="soundcloud" />
                  </div>
                </div>
                <div className="text-white font-bold text-sm mt-10">
                  Spotify Handle
                </div>
                <div className="mt-3">
                  <Field
                    id="spotify"
                    name="spotify"
                    placeholder="music_rabbit"
                    className="outline-none bg-grey-dark text-white text-sm"
                  />
                  <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                  <div className={styles.error}>
                    <ErrorMessage name="spotify" />
                  </div>
                </div>
                <div className="text-white font-bold text-sm mt-10">
                  Discord Handle
                </div>
                <div className="mt-3">
                  <Field
                    id="discord"
                    name="discord"
                    placeholder="music_rabbit"
                    className="outline-none bg-grey-dark text-white text-sm"
                  />
                  <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                  <div className={styles.error}>
                    <ErrorMessage name="discord" />
                  </div>
                </div>
                <button
                  className="text-white cursor-pointer rounded-full bg-purple px-24 py-3 ml-auto mt-10 font-bold text-sm"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Modal
        isOpen={showing}
        contentLabel="onRequestClose Example"
        className="flex justify-center items-center h-full"
      >
        <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-white text-3xl font-bold mb-10">
              Updating your profile
            </div>
            <Bars color="#7A64FF" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </>
  )
}
