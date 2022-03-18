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

type SingleNftPageProps = {
  nft: Nft
  nftSellings: Selling[]
  nftType: NftType
}

export default function SingleNftPage({
  nft,
  nftType,
  nftSellings,
}: SingleNftPageProps) {
  const { authUser } = useAuthContext()
  const [showCreateListing, setShowCreateListing] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (!authUser && router.isReady) {
      router.push(`/marketplace`)
    }
  }, [router.isReady])

  const isMe =
    nft.creator.ethAddress.toLowerCase() === authUser?.ethAddress?.toLowerCase()

  let owner: NftOwner = undefined

  if (nftType === NftType.MASTER) {
    owner = nft.masterOwner
  } else {
    owner = nft.licenseOwners.find(
      (licenseOwner) => licenseOwner.user.id === authUser?.id
    )
  }

  const { buyNft } = useBuy()
  const { unlistNft } = useUnlistSelling()

  const handleBuyNft = async () => {
    await buyNft({
      owner,
      nft,
      selling: nftSellings[0],
      amountToBuy: nftSellings[0].sellingVoucher.supply,
    })
  }

  const handleUnlistNft = async () => {
    await unlistNft({
      nftType,
      nft,
    })
  }

  return (
    <div>
      <Head>
        <title>Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 xl:h-screen text-white">
            <div className="col-span-1">
              <div className="flex flex-col m-10">
                <SoundCard
                  soundCard={{
                    id: nft.id,
                    creatorEthAddress: nft.creator.ethAddress,
                    creatorName: nft.creator.name,
                    licenses: nft.supply,
                    musicUrl: nft.fileUrl,
                    name: nft.metadata.name,
                    pictureUrl: nft.filePictureUrl,
                    tokenId: nft.tokenId,
                    nftType,
                  }}
                />
              </div>
            </div>
            <div className="col-span-3">
              {showCreateListing && isMe ? (
                <div className="flex flex-col items-center justify-center mt-12">
                  <div className="w-[36rem]">
                    <div className="flex items-center">
                      <div className="mr-5">
                        <Link href={`/profile/${owner.user.ethAddress}`}>
                          <div className="font-2xl hover:text-purple cursor-pointer">
                            <a>{'<- '}Back</a>
                          </div>
                        </Link>
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
                            <div className="font-2xl font-bold">
                              {nft.metadata.name}
                            </div>
                          </a>
                        </Link>
                        <div className="font-grey-light flex">
                          by
                          <Link
                            href={`/profile/${nft.masterOwner.user.ethAddress}`}
                          >
                            <div className="font-2xl hover:text-purple cursor-pointer">
                              <a>
                                <div className="text-purple font-2xl ml-2">
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
              ) : (
                <div className="flex flex-col m-16">
                  <div className="flex flex-col p-10">
                    <div className="text-white font-extrabold text-2xl  font-AOCR ">
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
                      {nftSellings[0] && (
                        <div className="flex flex-col mb-10">
                          <div className="flex mb-2">
                            <div className="text-3xl text-bolder mr-2">
                              {nftSellings[0].sellingVoucher.price.toFixed(2)}
                            </div>
                            <div className="text-grey-medium text-sm">ETH</div>
                          </div>
                          <div className="text-md text-grey-light">
                            Lowest Ask
                          </div>
                        </div>
                      )}
                      {isMe ? (
                        nftSellings.length ? (
                          <Button
                            text="Unlist Nft"
                            type="purple"
                            className="w-64"
                            onClick={handleUnlistNft}
                          />
                        ) : (
                          <Button
                            text="List Nft"
                            type="purple"
                            className="w-64"
                            onClick={() => setShowCreateListing(true)}
                          />
                        )
                      ) : nftSellings.length ? (
                        <Button
                          text="BUY"
                          type="purple"
                          className="w-64"
                          onClick={handleBuyNft}
                        />
                      ) : (
                        <Button
                          text="Not for sale"
                          type="disabled"
                          className="w-64"
                        />
                      )}
                    </div>
                    <div className="mt-24">
                      <div className="flex flex-col">
                        <div className="font-extrabold text-2xl uppercase font-AOCR border-b border-grey-medium pb-5">
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
    </div>
  )
}
