import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { Bars } from 'react-loader-spinner'
import styles from './CreateSellingForm.module.css'
import { useRouter } from 'next/router'
import { useCreateSelling } from '../../hooks/contracts/useCreateSelling'
import { AuthUser, Nft, NftType } from '../../common/graphql/schema.d'
import { useAuthContext } from '../../context/AuthContext'
import cn from 'classnames'
import Image from 'next/image'

export type CreateSellingFormProps = {
  user: AuthUser
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
  const { authUser } = useAuthContext()

   const initialValues = { price: 0, amount: nftType === NftType.Master ? 1 : 0 }

  let userSupply = 0
  let availableSupply = 0

  if (nftType === NftType.Master) {
    userSupply = nft.masterOwner.supply
    availableSupply = userSupply
  } else {
    userSupply = nft.licenseOwners.find(
      (licenseOwner) => licenseOwner.user.id === user.id
    ).supply

    const authLicenseSellings = nft.sellings?.licenseSellings?.filter(
      (selling) => selling.seller.id === authUser?.id
    )

    const alreadyListedSupply = authLicenseSellings.reduce(
      (supply, selling) =>
        supply +
        (selling.saleVoucher?.supply ?? selling.mintVoucher?.supply ?? 0),
      0
    )

    const alreadySoldSupply = authLicenseSellings.reduce(
      (supply, selling) =>
        supply +
        selling.buyers.reduce((supply, buyer) => supply + buyer.supply, 0),
      0
    )

    availableSupply = userSupply - (alreadyListedSupply - alreadySoldSupply)
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
    if (!authUser) {
      toast.error('Please connect your wallet.', { id: '1' })
      return
    }

    try {
      setLoading(true)
      await createSelling({
        price: parseFloat(values.price),
        amount: parseInt(values.amount),
        nftType,
        nft,
      })
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Error listing your NFT', { id: '1' })
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
      .max(availableSupply, `Your max supply on this nft is ${availableSupply}`)
      .required('Please enter a number'),
  })

  Modal.setAppElement('#__next')

  return (
    <>
      <div className="flex items-center justify-center mt-5 w-full">
        <div
          className={cn(
            'bg-white rounded-3xl p-5 md:p-16 w-full',
            styles.boxShadow
          )}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            <Form>
              <div className="text-black font-bold text-sm mt-10 mb-5">
                Type
              </div>
              <div className="flex flex-col bg-grey-medium text-white border border-white p-6 w-32 text-sm rounded-2xl justify-center items-center cursor-pointer">
                <div>Fixed Price</div>
              </div>
              <div className="text-black font-bold text-sm mt-10">Price</div>
              <div className="flex justify-start items-baseline mt-5">
                <div className="flex items-center">
                  <div className="relative w-5 h-8 flex justify-center items-center mr-5">
                    <Image
                      src="/img/ethIcon.svg"
                      layout="fill"
                      alt="Ethereum Logo"
                    />
                  </div>
                  <div>
                    <Field
                      id="price"
                      name="price"
                      placeholder="Amount"
                      className="outline-none  text-black w-full"
                    />
                    <div className="border-t-2 w-full border-grey-medium opacity-50"></div>
                    <div className={styles.error}>
                      <ErrorMessage name="price" />
                    </div>
                  </div>
                </div>
              </div>
              {nftType === NftType.License && (
                <>
                  <div className="text-black font-bold text-sm mt-10">
                    Amount
                  </div>

                  <div className="flex justify-start items-baseline mt-5">
                    <div className="mr-5">
                      <Field
                        id="amount"
                        name="amount"
                        className="outline-none  text-black w-full"
                      />
                      <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                      <div className="text-grey-dark mt-2 text-xs">
                        Number of licenses you want to sell
                      </div>
                      <div className={styles.error}>
                        <ErrorMessage name="amount" />
                      </div>
                    </div>
                    <div>
                      <div>{availableSupply}</div>
                      <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                      <div className="text-grey-dark mt-2 text-xs">
                        Total number of licenses available
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="text-black font-bold text-sm mt-10">Fees</div>
              <div className="text-grey-dark text-md mt-5 text-sm">
                Service fee: 3.5%
              </div>
              <button
                className="text-white cursor-pointer rounded-full bg-gradient-to-l from-[#1400FF] to-[#0089FF] px-24 py-3 ml-auto mt-10 font-bold text-sm"
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
        className="flex justify-center  items-center h-full z-50"
      >
        <div className="w-5/6 md:w-2/3 lg:w-1/2 h-1/2 rounded-3xl p-10 bg-white drop-shadow-2xl flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-black text-3xl font-bold mb-10">Listing</div>
            <Bars color="black" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </>
  )
}
