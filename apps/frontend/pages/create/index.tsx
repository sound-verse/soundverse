import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import Input from '../../components/collection/Input'
import LoadingModal from '../../components/common/modals/LoadingModal'
import ToggleSwitch from '../../components/common/ToggleSwitch'
import useCreateERC1155 from '../../hooks/contracts/useCreateERC1155'
import Button from '../../components/common/Button'
import Modal from 'react-modal'
import { Bars } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function Create() {
  const [nftFile, setNftFile] = useState(null)
  const [pictureFile, setPictureFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [showing, setShowing] = useState<Boolean>(false)
  const router = useRouter()

  const [handleMintClick, mintState] = useCreateERC1155(
    nftFile,
    pictureFile,
    name,
    description,
    setShowing
  )

  const handleMint = async () => {
    if (!nftFile) {
      toast.error('You have to provide a music file!')
      return
    }
    if (!pictureFile) {
      toast.error('You have to provide a nft cover file!')
      return
    }
    if (name === '') {
      toast.error('You have to provide a name!')
      return
    }
    if (description === '') {
      toast.error('You have to provide a description!')
      return
    }
    try {
      setShowing(true)
      await handleMintClick()
    } catch (e) {
      setShowing(false)
      console.log(e)
      toast.error('Error minting your NFT')
    }
  }

  useEffect(() => {
    if (mintState.status === 'Success') {
      setShowing(false)
      router.push('/marketplace')
    }
    if (mintState.status == 'Exception') {
      setShowing(false)
      toast('Error minting your NFT')
      console.log(mintState.errorMessage)
    }
  }, [mintState])

  Modal.setAppElement('#__next')

  return (
    <div>
      <Head>
        <title>Create Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          <Toaster position="top-right" />
          <div className="rounded-3xl bg-grey-dark max-w-3xl p-20 mx-auto mt-36 mb-36">
            <div className="flex flex-col">
              <div className="text-white font-bold text-base">Track</div>
              <div>
                <label
                  htmlFor="nft-file"
                  className="text-white border-2 border-white rounded-full p-2 mt-5 inline-block cursor-pointer px-36 whitespace-nowrap"
                >
                  Choose Music File
                </label>
                <input
                  type="file"
                  id="nft-file"
                  className="hidden"
                  onChange={async (e) => await setNftFile(e.target.files[0])}
                ></input>
                <div className="text-grey-light mt-3">
                  MP3, WAVE - Max 100Mb
                </div>
                <div className="text-grey-light">
                  {nftFile && `Selected File: ${nftFile.name}`}
                </div>
              </div>
              <div>
                <label
                  htmlFor="picture-file-upload"
                  className="text-white border-2 border-white rounded-full p-2 mt-5 inline-block cursor-pointer px-36 whitespace-nowrap"
                >
                  Choose Nft Cover Picture
                </label>
                <input
                  type="file"
                  id="picture-file-upload"
                  className="hidden"
                  onChange={async (e) =>
                    await setPictureFile(e.target.files[0])
                  }
                ></input>
                <div className="text-grey-light mt-3">JPG, PNG - Max 100Mb</div>
                <div className="text-grey-light">
                  {pictureFile && `Selected File: ${pictureFile.name}`}
                </div>
              </div>
              <div className="text-white font-bold text-base mt-10">
                Track Name
              </div>
              <div className="mt-3">
                <Input
                  id="track-name"
                  placeholder="Ice in the dark..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                <div className="text-grey-light">max. 20 characters</div>
              </div>
              <div className="text-white font-bold text-base mt-10">
                Description
              </div>
              <div className="mt-3">
                <textarea
                  className="w-full text-white bg-transparent border-2 rounded-3xl p-5"
                  id="trac-desc"
                  placeholder="I am ..."
                  value={description}
                  rows={8}
                  cols={50}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                ></textarea>
              </div>
              <button
                className="text-white cursor-pointer rounded-full bg-purple px-24 py-4 ml-auto mt-10 font-bold"
                onClick={handleMint}
              >
                Mint
              </button>
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
                  Minting
                </div>
                <Bars color="#7A64FF" height={80} width={80} />
              </div>
            </div>
          </Modal>
        </main>
      </Layout>
    </div>
  )
}
