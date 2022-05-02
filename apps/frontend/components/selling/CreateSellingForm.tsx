import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { Bars } from 'react-loader-spinner'
import styles from './CreateSellingForm.module.css'
import { useProfile } from '../../hooks/useProfile'
import { LoggedInUser, useLogin } from '../../hooks/useLogin'
import { useRouter } from 'next/router'
import { useCreateSelling } from '../../hooks/contracts/useCreateSelling'
import { Nft, NftType } from '../../common/graphql/schema.d'

export type CreateSellingFormProps = {
  user: LoggedInUser
  nftType: NftType
  nft: Nft
  showSingleNftPage: Dispatch<SetStateAction<boolean>>
}

export const CreateSellingForm = ({
  user,
  nftType,
  nft,
  showSingleNftPage,
}: CreateSellingFormProps) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()
  const { createSelling, selling } = useCreateSelling()

  const initialValues = { price: 0, amount: 0 }

  let userSupply = 0

  if (nftType === NftType.Master) {
    userSupply = nft.masterOwner.supply
  } else {
    userSupply = nft.licenseOwners.find(
      (licenseOwner) => licenseOwner.user.id === user.id
    ).supply
  }

  useEffect(() => {
    if (selling) {
      showSingleNftPage(false)
      router.push(
        `/${nftType === NftType.Master ? 'master' : 'license'}/${nft.id}`
      )
      setLoading(false)
    }
  }, [selling])

  const onSubmit = async (values, onSubmitProps) => {
    try {
      setLoading(true)
      await createSelling({
        price: parseFloat(values.price),
        amount: parseInt(values.amount),
        nftType,
        nft,
        royaltyFeeInBips: nft.royaltyFeeInBips,
      })
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Error listing your NFT')
    }

    onSubmitProps.setSubmitting(false)
  }

  const validationSchema = Yup.object().shape({
    price: Yup.number()
      .typeError('Please enter a number')
      .min(0.00001, 'You have to enter a price minium of 0.00001')
      .max(100000000, 'The price can only be up to 100000000')
      .required('Please enter a number'),
    amount: Yup.number()
      .typeError('Please enter the amount you want to sell')
      .min(1, 'You have to enter a minimum amount of 1')
      .max(userSupply, `Your max supply on this nft is ${userSupply}`)
      .required('Please enter a number'),
  })

  Modal.setAppElement('#__next')

  return (
    <>
      <div className="flex items-center justify-center mt-5 w-full">
        <div className="bg-grey-dark rounded-3xl p-16 w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            <Form>
              <div className="text-white font-bold text-sm mt-10 mb-5">
                Type
              </div>
              <div className="flex flex-col bg-grey-medium border border-white p-6 w-32 text-sm rounded-2xl justify-center items-center cursor-pointer">
                <div>$</div>
                <div>Fixed Price</div>
              </div>
              <div className="text-white font-bold text-sm mt-10">Price</div>
              <div className="flex justify-start items-baseline mt-5">
                <div className="border border-white font-bold rounded-full px-5 py-2 mr-8 text-sm ">
                  MATIC
                </div>
                <div className="">
                  <Field
                    id="price"
                    name="price"
                    placeholder="Amount"
                    className="outline-none bg-grey-dark text-white w-full"
                  />
                  <div className="border-t-2 w-full border-grey-medium opacity-50"></div>
                  <div className={styles.error}>
                    <ErrorMessage name="price" />
                  </div>
                </div>
              </div>
              <div className="text-white font-bold text-sm mt-10">Amount</div>
              <div className="flex justify-start items-baseline mt-5">
                <div className="mr-5">
                  <Field
                    id="amount"
                    name="amount"
                    className="outline-none bg-grey-dark text-white w-full"
                  />
                  <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                  <div className="text-grey-light mt-2 text-xs">
                    Number of licenses you want to sell
                  </div>
                  <div className={styles.error}>
                    <ErrorMessage name="amount" />
                  </div>
                </div>
                <div>
                  <div>{userSupply}</div>
                  <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                  <div className="text-grey-light mt-2 text-xs">
                    Total number of licenses available
                  </div>
                </div>
              </div>
              <div className="text-white font-bold text-sm mt-10">Fees</div>
              <div className="text-grey-light text-md mt-5 text-sm">
                Service fee: 3.5%
              </div>
              <button
                className="text-white cursor-pointer rounded-full bg-purple px-24 py-3 ml-auto mt-10 font-bold text-sm"
                type="submit"
              >
                Complete Listing
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <Modal
        isOpen={loading}
        contentLabel="onRequestClose Example"
        className="flex justify-center items-center h-full z-50"
      >
        <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-white text-3xl font-bold mb-10">Listing</div>
            <Bars color="#7A64FF" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </>
  )
}
