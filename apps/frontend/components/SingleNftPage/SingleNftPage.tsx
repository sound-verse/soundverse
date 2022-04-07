import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { useAuthContext } from '../../context/AuthContext'
import SoundCard from '../../components/marketplace/SoundCard'
import { ProfileName } from '../../components/profile'
import Button from '../../components/common/Button'
import Link from 'next/link'
import { Nft, NftOwner, Selling } from '../../common/graphql/schema'
import { NftType } from '../../common/types/nft-type.enum'
import { CreateSellingForm } from '../selling/CreateSellingForm'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useBuy } from '../../hooks/contracts/useBuy'
import toast from 'react-hot-toast'
import { useUnlistSelling } from '../../hooks/contracts/useUnlistSelling'
import { BuyLicense } from '../selling/BuyLicense'
import Modal from 'react-modal'
import Web3 from 'web3'
import { Bars } from 'react-loader-spinner'

type SingleNftPageProps = {
  nft: Nft
  nftType: NftType
}

export default function SingleNftPage({ nft, nftType }: SingleNftPageProps) {
  const { authUser } = useAuthContext()
  const [showCreateListing, setShowCreateListing] = useState<boolean>(false)
  const [showBuyLicense, setShowBuyLicense] = useState<boolean>(false)
  const [selectedSelling, setSelectedSelling] = useState<Selling>(undefined)
  const router = useRouter()
  const [showBoughtSuccess, setShowBoughtSuccess] = useState<boolean>(false)
  const [showUnlistedSuccess, setShowUnlistedSuccess] = useState<boolean>(false)
  const [showing, setShowing] = useState<Boolean>(false)

  // useEffect(() => {
  //   if (!authUser && router.isReady) {
  //     router.push(`/marketplace`)
  //   }
  // }, [router.isReady])

  const authMasterOwner =
    nft.masterOwner.user.id === authUser?.id ? nft.masterOwner : undefined
  const authLicenseOwner = nft.licenseOwners.find(
    (licenseOwner) => licenseOwner.user.id === authUser?.id
  )
  const authMasterSelling =
    nft.sellings.masterSelling?.seller?.id === authUser?.id
      ? nft.sellings.masterSelling
      : undefined
  const authLicenseSellings = nft.sellings?.licenseSellings?.filter(
    (selling) => selling.seller.id === authUser?.id
  )

  const authLicenseSellingsTotalAmount = authLicenseSellings.reduce(
    (supply, selling) => supply + selling.sellingVoucher.supply,
    0
  )

  let isListable = false
  if (nftType === NftType.MASTER) {
    if (authMasterOwner && !authMasterSelling) {
      isListable = true
    }
  } else {
    if (
      authLicenseOwner &&
      authLicenseOwner.supply > authLicenseSellingsTotalAmount
    ) {
      isListable = true
    }
  }

  let isUnlistable = false
  if (nftType === NftType.MASTER) {
    if (authMasterSelling) {
      isUnlistable = true
    }
  } else {
    if (authLicenseSellings.length > 0) {
      isUnlistable = true
    }
  }

  let isBuyable = false
  if (nftType === NftType.MASTER) {
    if (
      nft.sellings.masterSelling &&
      nft.sellings.masterSelling.seller.id !== authUser?.id
    ) {
      isBuyable = true
    }
  } else {
    if (
      nft.sellings.licenseSellings.length > 0 &&
      nft.sellings.licenseSellings.length > authLicenseSellings.length
    ) {
      isBuyable = true
    }
  }

  const { buyNft, buyNftState } = useBuy()
  const { unlistNft, unlistNftState } = useUnlistSelling()

  useEffect(() => {
    if (buyNftState.status === 'Success') {
      setShowBoughtSuccess(true)
    }
  }, [buyNftState])

  useEffect(() => {
    if (unlistNftState.status === 'Success') {
      console.log('unlisted')
      setShowUnlistedSuccess(true)
    }
  }, [unlistNftState])

  const handleBuyNft = async () => {
    setShowing(true)
    await buyNft({
      nft,
      selling: nft.sellings.masterSelling,
      amountToBuy: 1,
    })
    setShowing(false)
  }

  const handleBuyLicense = async () => {
    await buyNft({
      nft,
      selling: selectedSelling,
      amountToBuy: 1,
    })
  }

  const handleUnlistNft = async () => {
    await unlistNft({
      nftType,
      nft,
    })
  }

  Modal.setAppElement('#__next')

  return (
    <div>
      <Head>
        <title>Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 xl:h-screen text-white">
            <div className="col-span-1">
              <div className="flex flex-col mt-10 mb-5">
                <SoundCard className="h-full" nft={nft} nftType={nftType} />
                {selectedSelling && nft.sellings.licenseSellings.length > 0 && (
                  <div className="flex flex-col mt-10">
                    <div className="font-bold w-64 text-right mb-5 text-2xl">
                      {parseFloat(
                        Web3.utils.fromWei(selectedSelling.sellingVoucher.price)
                      ).toFixed(2)}{' '}
                      {selectedSelling.sellingVoucher.currency}
                    </div>
                    <Button
                      text="BUY NOW"
                      type="purple"
                      className="w-64"
                      onClick={handleBuyLicense}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-3">
              {showCreateListing && isListable ? (
                <div className="flex flex-col items-center justify-center mt-12">
                  <div className="w-[36rem]">
                    <div className="flex items-center">
                      <div className="mr-5">
                        <div className="font-xl hover:text-purple cursor-pointer">
                          <div onClick={() => setShowCreateListing(false)}>
                            {'<- '}Back
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          href={`/${
                            nftType === NftType.MASTER ? 'master' : 'license'
                          }/${nft.id}`}
                        >
                          <a className="flex items-center justify-center">
                            <Image
                              src={nft.filePictureUrl}
                              layout="fixed"
                              width={50}
                              height={50}
                              className="rounded"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="flex flex-col ml-5">
                        <Link
                          href={`/${
                            nftType === NftType.MASTER ? 'master' : 'license'
                          }/${nft.id}`}
                        >
                          <a>
                            <div className="font-xl font-bold">
                              {nft.metadata.name}
                            </div>
                          </a>
                        </Link>
                        <div className="font-grey-light flex">
                          by
                          <Link
                            href={`/profile/${nft.masterOwner.user.ethAddress}`}
                          >
                            <div className="font-xl hover:text-purple cursor-pointer">
                              <a>
                                <div className="text-purple font-xl ml-2">
                                  <ProfileName
                                    name={nft.masterOwner.user.name}
                                    ethAddress={nft.masterOwner.user.ethAddress}
                                    short={true}
                                  />
                                </div>
                              </a>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <CreateSellingForm
                      user={authUser}
                      nft={nft}
                      nftType={nftType}
                      showSingleNftPage={(showCreateListing) =>
                        setShowCreateListing(showCreateListing)
                      }
                    />
                  </div>
                </div>
              ) : showBuyLicense ? (
                <div className="flex flex-col items-center justify-center mt-12">
                  <div className="w-[50rem]">
                    <div
                      onClick={() => {
                        setSelectedSelling(undefined)
                        setShowBuyLicense(false)
                      }}
                      className="hover:text-purple cursor-pointer text-xl mb-10"
                    >
                      {'<- Back'}
                    </div>
                    <BuyLicense
                      sellings={nft.sellings.licenseSellings}
                      user={authUser}
                      showSingleNftPage={(showBuyLicense) =>
                        setShowBuyLicense(showBuyLicense)
                      }
                      setSelectedSelling={setSelectedSelling}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col m-16">
                  <div className="flex flex-col p-10">
                    <div className="text-white font-extrabold text-xl  font-AOCR ">
                      <Link href={`/profile/${nft.creator.ethAddress}`}>
                        <a>
                          <ProfileName
                            ethAddress={nft.creator.ethAddress}
                            name={nft.creator.name}
                            className="inline-block font-bold text-purple"
                            short={true}
                          />
                        </a>
                      </Link>
                      {' - '}
                      {nft.metadata.name}
                    </div>
                    <div className="flex justify-between items-baseline text-white border-b border-grey-medium pb-5">
                      <div className="mt-12">
                        Owned by: <br />
                        <br />
                        {nftType === NftType.LICENSE ? (
                          nft.licenseOwners.map((licenseOwner, key) => {
                            return (
                              <div key={key}>
                                <Link
                                  href={`/profile/${licenseOwner.user.ethAddress}`}
                                >
                                  <a>
                                    <ProfileName
                                      ethAddress={licenseOwner.user.ethAddress}
                                      name={licenseOwner.user.name}
                                      className="inline-block font-bold text-purple"
                                      short={true}
                                    />
                                  </a>
                                </Link>
                                <span>
                                  {' '}
                                  ({`${licenseOwner.supply}/${nft.supply}`})
                                </span>
                              </div>
                            )
                          })
                        ) : (
                          <Link
                            href={`/profile/${nft.masterOwner.user.ethAddress}`}
                          >
                            <a>
                              <ProfileName
                                ethAddress={nft.masterOwner.user.ethAddress}
                                name={nft.masterOwner.user.name}
                                className="inline-block font-bold text-purple"
                                short={true}
                              />
                            </a>
                          </Link>
                        )}
                      </div>
                      <div>
                        Type:{' '}
                        <span className="font-bold">
                          {nftType === NftType.MASTER ? 'Master' : 'License'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-10">
                      {NftType.MASTER
                        ? nft.sellings.masterSelling && (
                            <div className="flex flex-col mb-10">
                              <div className="flex mb-2">
                                <div className="text-3xl text-bolder mr-2">
                                  {parseFloat(
                                    Web3.utils.fromWei(
                                      nft.sellings.masterSelling.sellingVoucher
                                        .price
                                    )
                                  ).toFixed(2)}
                                </div>
                                <div className="text-grey-medium text-sm">
                                  {nft.sellings.masterSelling.sellingVoucher.currency.toUpperCase()}
                                </div>
                              </div>
                              <div className="text-md text-grey-light">
                                Lowest Ask
                              </div>
                            </div>
                          )
                        : nft.sellings.licenseSellings[0] && (
                            <div className="flex flex-col mb-10">
                              <div className="flex mb-2">
                                <div className="text-3xl text-bolder mr-2">
                                  {parseFloat(
                                    Web3.utils.fromWei(
                                      nft.sellings.licenseSellings[0]
                                        .sellingVoucher.price
                                    )
                                  ).toFixed(2)}
                                </div>
                                <div className="text-grey-medium text-sm">
                                  {nft.sellings.licenseSellings[0].sellingVoucher.currency.toUpperCase()}
                                </div>
                              </div>
                              <div className="text-md text-grey-light">
                                Lowest Ask
                              </div>
                            </div>
                          )}
                      {isListable && (
                        <Button
                          text="List Nft"
                          type="purple"
                          className="w-48 mx-2"
                          onClick={() => setShowCreateListing(true)}
                        />
                      )}
                      {isUnlistable && (
                        <Button
                          text="Unlist Nft"
                          type="purple"
                          className="w-48 mx-2"
                          onClick={handleUnlistNft}
                        />
                      )}
                      {isBuyable && nftType === NftType.MASTER && (
                        <Button
                          text="Select and BUY"
                          type="purple"
                          className="w-48 mx-2"
                          onClick={handleBuyNft}
                        />
                      )}
                      {isBuyable && nftType === NftType.LICENSE && (
                        <Button
                          text="BUY"
                          type="purple"
                          className="w-48 mx-2"
                          onClick={() => setShowBuyLicense(true)}
                        />
                      )}
                      {!isBuyable && !isListable && !isUnlistable && (
                        <Button
                          text="Not for sale"
                          type="disabled"
                          className="w-48"
                        />
                      )}
                    </div>
                    <div className="mt-24">
                      <div className="flex flex-col">
                        <div className="font-extrabold text-xl uppercase font-AOCR border-b border-grey-medium pb-5">
                          Details
                        </div>
                        <div className="text-white mt-5">
                          {nft.metadata.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </Layout>
      <Modal
        isOpen={showBoughtSuccess || showUnlistedSuccess}
        contentLabel="onRequestClose Example"
        className="flex justify-center items-center h-full"
      >
        <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-white text-3xl font-bold mb-10 text-center">
              {showBoughtSuccess && 'You successfully bought your NFT!'}
              {showUnlistedSuccess && 'You successfully unlisted your NFT!'}
            </div>
            <Button
              type="purple"
              text="Got it!"
              className="!px-16 !py-4 text-xl"
              onClick={() => {
                setShowBoughtSuccess(false)
                setShowUnlistedSuccess(false)
                router.push(
                  `/${nftType === NftType.LICENSE ? 'license' : 'master'}/${
                    nft.id
                  }`
                )
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showing}
        contentLabel="onRequestClose Example"
        className="flex justify-center items-center h-full"
      >
        <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-white text-3xl font-bold mb-10">
              Buying NFT
            </div>
            <Bars color="#7A64FF" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
