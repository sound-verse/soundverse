import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { useAuthContext } from '../../context/AuthContext'
import SoundCard from '../../components/marketplace/SoundCard'
import { ProfileName } from '../../components/profile'
import Button from '../../components/common/Button'
import Link from 'next/link'
import {
  MintVoucher,
  Nft,
  NftOwner,
  NftType,
  SaleVoucher,
  Selling,
} from '../../common/graphql/schema.d'
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
import { useLogin } from '../../hooks/useLogin'
import { UnlistLicense } from '../selling/UnlistLicense'

type SingleNftPageProps = {
  nft: Nft
  nftType: NftType
}

export default function SingleNftPage({ nft, nftType }: SingleNftPageProps) {
  const { authUser } = useAuthContext()
  const [showCreateListing, setShowCreateListing] = useState<boolean>(false)
  const [showBuyLicense, setShowBuyLicense] = useState<boolean>(false)
  const [showUnlistLicense, setShowUnlistLicense] = useState<boolean>(false)
  const [selectedSelling, setSelectedSelling] = useState<Selling>(undefined)
  const router = useRouter()
  const [showBoughtSuccess, setShowBoughtSuccess] = useState<boolean>(false)
  const [showUnlistedSuccess, setShowUnlistedSuccess] = useState<boolean>(false)
  const [showing, setShowing] = useState<Boolean>(false)
  const [showIsUnlisting, setShowIsUnlisting] = useState<Boolean>(false)

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
    (supply, selling) =>
      supply +
      (selling.saleVoucher?.supply ?? selling.mintVoucher?.supply ?? 0),
    0
  )

  let isListable = false
  if (nftType === NftType.Master) {
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
  if (nftType === NftType.Master) {
    if (authMasterSelling) {
      isUnlistable = true
    }
  } else {
    if (authLicenseSellings.length > 0) {
      isUnlistable = true
    }
  }

  let isBuyable = false
  if (nftType === NftType.Master) {
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

  let lowestAskSellingVoucher
  if (nftType === NftType.Master) {
    lowestAskSellingVoucher =
      nft.sellings.masterSelling?.saleVoucher ??
      nft.sellings.masterSelling?.mintVoucher ??
      undefined
  } else {
    lowestAskSellingVoucher = nft.sellings?.licenseSellings?.reduce(
      (lowest: MintVoucher | SaleVoucher, selling: Selling) => {
        return parseFloat(Web3.utils.fromWei(lowest?.price ?? '0')) >
          parseFloat(
            Web3.utils.fromWei(
              selling.saleVoucher?.price ?? selling.mintVoucher?.price
            )
          )
          ? selling?.saleVoucher ?? selling?.mintVoucher
          : lowest
      },
      nft.sellings?.licenseSellings[0]?.mintVoucher ??
        nft.sellings?.licenseSellings[0]?.saleVoucher
    )
  }

  const { buyNft, buyNftState } = useBuy()
  const { unlistNft, unlistNftState } = useUnlistSelling()

  useEffect(() => {
    if (buyNftState.status === 'Success') {
      setShowBoughtSuccess(true)
      setShowing(false)
    }
    if (buyNftState.status === 'Exception') {
      toast.error(
        'Error buying the NFT. Do you have enough funds in your wallet?'
      )
      setShowing(false)
    }
  }, [buyNftState])

  useEffect(() => {
    if (unlistNftState.status === 'Success') {
      setShowUnlistedSuccess(true)
      setShowIsUnlisting(false)
    }
    if (unlistNftState.status === 'Exception') {
      toast.error('Error unlisting the NFT.')
      setShowIsUnlisting(false)
    }
  }, [unlistNftState])

  const handleBuyNft = async () => {
    if (!authUser) {
      toast.error('Please connect your wallet.')
      return
    }
    setShowing(true)
    await buyNft({
      nft,
      selling: nft.sellings.masterSelling,
      amountToBuy: 1,
    })
  }

  const handleBuyLicense = async () => {
    if (!authUser) {
      toast.error('Please connect your wallet.')
      return
    }
    setShowing(true)
    await buyNft({
      nft,
      selling: selectedSelling,
      amountToBuy: 1,
    })
  }

  const handleUnlistNft = async () => {
    if (!authUser) {
      toast.error('Please connect your wallet.')
      return
    }
    setShowIsUnlisting(true)
    await unlistNft({ selling: authMasterSelling })
  }

  const handleUnlistLicense = async () => {
    if (!authUser) {
      toast.error('Please connect your wallet.')
      return
    }
    setShowIsUnlisting(true)
    await unlistNft({ selling: selectedSelling })
  }

  Modal.setAppElement('#__next')

  return (
    <div>
      <Head>
        <title>Nft</title>
        <meta name="description" content="Short description of this page" />
        <meta property="og:title" content="Nft" />
        <meta property="og:description" content="Short description of this page" />
        <meta property="og:url" content={`https://soundverse.io${router.asPath}`} />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 xl:h-screen text-black">
            <div className="col-span-1">
              <div className="flex flex-col mt-5 mb-5">
                <SoundCard className="h-full" nft={nft} nftType={nftType} />
                {selectedSelling && showBuyLicense && (
                  <div className="flex flex-col mt-5">
                    {/* <div className="font-bold w-64 mb-5 text-xl">
                      {parseFloat(
                        Web3.utils.fromWei(
                          selectedSelling.saleVoucher?.price ??
                            selectedSelling.mintVoucher.price
                        )
                      ).toFixed(2)}{' '}
                      {selectedSelling.saleVoucher?.currency ??
                        selectedSelling.mintVoucher.currency}
                    </div> */}
                    <Button
                      text="BUY NOW"
                      type="normal"
                      className="w-52"
                      onClick={handleBuyLicense}
                    />
                  </div>
                )}
                {selectedSelling && showUnlistLicense && (
                  <div className="flex flex-col mt-5">
                    <Button
                      text="Unlist License"
                      type="normal"
                      className="w-52"
                      onClick={handleUnlistLicense}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-3">
              {showCreateListing && isListable ? (
                <div className="flex flex-col items-center justify-center mt-12">
                  <div className="w-full lg:w-[36rem]">
                    <div className="flex items-center">
                      <div className="mr-5">
                        <div className="font-xl hover:text-[#1400FF] cursor-pointer">
                          <div onClick={() => setShowCreateListing(false)}>
                            {'<- '}Back
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          href={`/${
                            nftType === NftType.Master ? 'master' : 'license'
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
                            nftType === NftType.Master ? 'master' : 'license'
                          }/${nft.id}`}
                        >
                          <a>
                            <div className="font-xl font-bold">
                              {nft.metadata.name}
                            </div>
                          </a>
                        </Link>
                        <div className="font-grey-dark flex">
                          by
                          <Link
                            href={`/profile/${nft.masterOwner.user.ethAddress}`}
                          >
                            <div className="font-xl hover:text-[#1400FF] cursor-pointer">
                              <a>
                                <div className="text-[#1400FF] font-xl ml-2">
                                  <ProfileName
                                    name={nft.masterOwner.user.name}
                                    ethAddress={nft.masterOwner.user.ethAddress}
                                    short={true}
                                    fullName={true}
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
                  <div className="w-full lg:w-[50rem]">
                    <div
                      onClick={() => {
                        setSelectedSelling(undefined)
                        setShowBuyLicense(false)
                      }}
                      className="hover:text-[#1400FF] cursor-pointer text-lg mb-10"
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
              ) : showUnlistLicense ? (
                <div className="flex flex-col items-center justify-center mt-12">
                  <div className="w-full lg:w-[50rem]">
                    <div
                      onClick={() => {
                        setSelectedSelling(undefined)
                        setShowUnlistLicense(false)
                      }}
                      className="hover:text-[#1400FF] cursor-pointer text-lg mb-10"
                    >
                      {'<- Back'}
                    </div>
                    <UnlistLicense
                      userSellings={authLicenseSellings}
                      user={authUser}
                      showSingleNftPage={(showUnlistLicense) =>
                        setShowUnlistLicense(showUnlistLicense)
                      }
                      setSelectedSelling={setSelectedSelling}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex flex-col mt-5">
                    <div className="text-black font-extrabold text-lg  font-AOCR ">
                      <Link href={`/profile/${nft.creator.ethAddress}`}>
                        <a>
                          <ProfileName
                            ethAddress={nft.creator.ethAddress}
                            name={nft.creator.name}
                            className="inline-block font-bold text-[#1400FF]"
                            short={true}
                            fullName={true}
                          />
                        </a>
                      </Link>
                      {' - '}
                      {nft.metadata.name}
                    </div>
                    <div className="flex justify-between items-baseline text-black border-b border-grey-medium pb-5 text-sm">
                      <div className="mt-12">
                        Owned by: <br />
                        <br />
                        {nftType === NftType.License ? (
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
                                      className="inline-block font-bold text-[#1400FF]"
                                      short={true}
                                      fullName={true}
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
                                className="inline-block font-bold text-[#1400FF]"
                                short={true}
                                fullName={true}
                              />
                            </a>
                          </Link>
                        )}
                      </div>
                      <div>
                        Type:{' '}
                        <span className="font-bold text-sm">
                          {nftType === NftType.Master ? 'Master' : 'License'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-10">
                      {NftType.Master
                        ? lowestAskSellingVoucher && (
                            <div className="flex flex-col mb-10">
                              <div className="flex mb-2">
                                <div className="text-xl text-bolder mr-2">
                                  {parseFloat(
                                    Web3.utils.fromWei(
                                      lowestAskSellingVoucher.price
                                    )
                                  ).toFixed(2)}
                                </div>
                                <div className="text-grey-medium text-xs">
                                  {lowestAskSellingVoucher.currency.toUpperCase()}
                                </div>
                              </div>
                              <div className="text-md text-grey-dark">
                                Lowest Ask
                              </div>
                            </div>
                          )
                        : lowestAskSellingVoucher && (
                            <div className="flex flex-col mb-10">
                              <div className="flex mb-2">
                                <div className="text-3xl text-bolder mr-2">
                                  {parseFloat(
                                    Web3.utils.fromWei(
                                      lowestAskSellingVoucher.price
                                    )
                                  ).toFixed(2)}
                                </div>
                                <div className="text-grey-medium text-sm">
                                  {lowestAskSellingVoucher.currency.toUpperCase()}
                                </div>
                              </div>
                              <div className="text-sm text-grey-dark">
                                Lowest Ask
                              </div>
                            </div>
                          )}
                      {isListable && (
                        <Button
                          text={`List ${
                            nftType === NftType.Master
                              ? 'Master'
                              : authLicenseSellingsTotalAmount > 0
                              ? 'more Licenses'
                              : 'Licenses'
                          }`}
                          type="normal"
                          className="w-48 mx-2"
                          onClick={() => setShowCreateListing(true)}
                        />
                      )}
                      {isUnlistable && nftType === NftType.Master && (
                        <Button
                          text={'Unlist Master'}
                          type="normal"
                          className="w-48 mx-2"
                          onClick={handleUnlistNft}
                        />
                      )}
                      {isUnlistable && nftType === NftType.License && (
                        <Button
                          text={'Unlist Licenses'}
                          type="normal"
                          className="w-48 mx-2"
                          onClick={() => setShowUnlistLicense(true)}
                        />
                      )}
                      {isBuyable && nftType === NftType.Master && (
                        <Button
                          text="Select and BUY"
                          type="normal"
                          className="w-48 mx-2"
                          onClick={handleBuyNft}
                        />
                      )}
                      {isBuyable && nftType === NftType.License && (
                        <Button
                          text="BUY"
                          type="normal"
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
                        <div className="font-extrabold text-lg uppercase font-AOCR border-b border-grey-medium pb-5">
                          Details
                        </div>
                        <div className="text-black mt-5 text-sm">
                          {nft.metadata.description}
                        </div>
                      </div>
                      <div className="flex justify-end items-center mt-10">
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-3xl font-bold">
                            {nft.royaltyFeeMaster / 100}%
                          </div>
                          <div className="text-sm text-grey-dark">Royalty</div>
                        </div>
                        <div className="flex flex-col items-center justify-center ml-16">
                          <div className="text-3xl font-bold">
                            {nft.creatorOwnerSplit / 100}%
                          </div>
                          <div className="text-sm text-grey-dark">
                            Creator / Owner split
                          </div>
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
        className="flex justify-center items-center h-full"
      >
        <div className="w-5/6 md:w-2/3 lg:w-1/2 h-1/2 rounded-3xl p-10 bg-white drop-shadow-2xl flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-black text-2xl font-bold mb-10 text-center">
              {showBoughtSuccess && 'You successfully bought your NFT!'}
              {showUnlistedSuccess && 'You successfully unlisted your NFT!'}
            </div>
            <Button
              type="normal"
              text="Got it!"
              className="!px-16 !py-4 text-lg bg-gradient-to-l from-[#1400FF] to-[#0089FF]"
              onClick={() => {
                setShowBoughtSuccess(false)
                setShowUnlistedSuccess(false)
                router.push(
                  `/${nftType === NftType.License ? 'license' : 'master'}/${
                    nft.id
                  }`
                )
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showing || showIsUnlisting}
        className="flex justify-center items-center h-full"
      >
        <div className="w-5/6 md:w-2/3 lg:w-1/2 h-1/2 rounded-3xl p-10 bg-white drop-shadow-2xl flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-black text-2xl font-bold mb-10">
              {showIsUnlisting ? 'Unlisting' : 'Buying'} NFT
            </div>
            <Bars color="black" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
