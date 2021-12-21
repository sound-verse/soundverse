import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import Input from '../../components/collection/Input'
import LoadingModal from '../../components/common/modals/LoadingModal'
import ToggleSwitch from '../../components/common/ToggleSwitch'
import useCreateERC1155 from '../../hooks/contracts/useCreateERC1155'

export default function Create() {
  const [file, setSelectedFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [showing, setShowing] = useState<Boolean>(false)


  const [handleMintClick, mintState] = useCreateERC1155(file, name, description,setShowing)
  const modalOnClick = () => setShowing(false)

  return (
    <div>
      <Head>
        <title>Create Nft</title>
      </Head>
      
            <Layout>
        <main className="mx-auto">
          <h2 className="text-white dark:text-white text-3xl font-bold mt-8 mb-4 leading-tight">
            Create Collection
          </h2>

          <div>
            <h3 className="text-lg font-bold my-1">Preview</h3>
            <div>
              Upload a moment of o your live set where you played an unpublished
              music{' '}
            </div>
            <div className="flex">
              <div>Live Video Moment</div>
              <div>Add album covers</div>
            </div>
          </div>

          <div className="my-5">
            <h3 className="text-lg font-bold my-1">Unlock once purchased</h3>
            <div>Content will be unlocked after successful transaction</div>

            <input
              type="file"
              id="file"
              name="file"
              onChange={async (e) => await setSelectedFile(e.target.files[0])}
            ></input>

            <div className="my-3">
              <Input
                id="trackId"
                placeholder="Track Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="my-3">
              <Input
                id="trackDesc"
                placeholder="Track Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </div>
            <div className="my-3">
              <Input id="tags" placeholder="Tags" disabled={true} />
            </div>
          </div>

          <div className="my-5">
            <h3 className="text-lg font-bold my-1">Copyright ownership</h3>
            <div>
              I certify that I own 100% copyrights on this unpublished track and
              I agree with Linifty terms and coniditions.{' '}
            </div>
          </div>
          {showing ? <LoadingModal onClick = {modalOnClick} ></LoadingModal>: null}

          <div className="my-5">
            <h3 className="text-lg font-bold my-1">
              Engage with your fans and maximise your marketing potential
            </h3>
            <div>
              <div>
                In the near future we are planning to allow artists to sell
                portion of their unpublished music copyright as an NFT to their
                fans. This bring artists and their fans closer than ever and
                allow both benefit from each other. You can rad more about this
                here in our article.{' '}
              </div>
              <div className="mt-3">
                In the case of this feature release are you willing to allow
                people who collected this NFT take part of the live auction
                event where they can buy portion of this track copyright ?{' '}
              </div>
              <ToggleSwitch />
            </div>
          </div>

          <div className="my-5">
            <h3 className="text-lg font-bold my-1">Price</h3>
            <div>Enter price to allow users instantly purchase your NFT</div>
            <div className="my-3 flex">
              <Input id="price" placeholder="Price" disabled={true} /> ETH
            </div>
            {/* <div>
              Service fee: 5% <br />
              You will recieve 0.915 ETH = $3,871.00
            </div> */}
          </div>

          <div className="my-5">
            <div className="flex">
              <div>
                <h3 className="text-lg font-bold my-1">Royalty</h3>
                <Input
                  id="royalty"
                  placeholder="10%, 15%, 30%"
                  disabled={true}
                />
              </div>
              <div className="ml-10">
                <h3 className="text-lg font-bold my-1">Number of editions</h3>
                <Input id="numEditions" placeholder="100" disabled={true} />
              </div>
            </div>
          </div>

          <div className="my-5">
            <h3 className="text-lg font-bold my-1">Royalty Partners</h3>
          </div>

          <button
            className="createBtn mb-8 w-44 h-8 text-white text-md font-bold border border-white rounded-xl"
            // @ts-ignore:next-line
            onClick={handleMintClick}
          >
            Create the package
          </button>
        </main>
      </Layout>

      <style jsx>{`
        div {
          color: #fff;
        }

        h3 {
          color: #ede7f6;
        }

        .chooseBtn {
          background: #6200ea;
        }
        .createBtn {
          background: #6200ea;
        }
      `}</style>
    </div>
  )
}
