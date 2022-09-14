import React, { useCallback, useEffect, useState } from 'react'
import { createApolloClient } from '../../lib/createApolloClient'
import { User } from '../../hooks/useProfile'
import Custom404 from '../404'
import SingleNftPage from '../../components/SingleNftPage/SingleNftPage'
import { GET_NFT } from '../../common/graphql/queries/get-nft.query'
import { Nft, Selling, NftType } from '../../common/graphql/schema.d'
import Head from 'next/head'
import Layout from '../../components/layout'
import { useAudioContext } from '../../context/AudioContext'

export default function Soundtest() {
  const { setCurrentTrack, currentTrack } = useAudioContext()

  const handlePlay = useCallback(() => {
    setCurrentTrack({
      url: '/dummy/dummy.mp3',
      waveForm: [
        0.06668534874916077, -0.05741075426340103, 0.05851012468338013,
        -0.09296835213899612, 0.07477575540542603, -0.08782101422548294,
        0.11066360026597977, -0.0477738082408905, 0.11248180270195007,
        -0.06280726194381714, 0.05673525854945183, -0.16519753634929657,
        0.024955160915851593, -0.04258160665631294, 0.056970562785863876,
        -0.11238270998001099, 0.09637515246868134, -0.04308032989501953,
        0.03724837675690651, -0.05804464593529701,
      ],
      trackName: 'test',
      currentPosition: 0,
      creatorName: 'me',
      trackPictureUrl: '/dummy/dummy.jpg',
      creatorEthAddress: '0x0',
      id: '1',
      contractAddress: '0x0',
      play: !currentTrack.play,
      isPlaying: !currentTrack.isPlaying,
      nftType: NftType.Master,
      restart: true,
      isRoomPlayer: false,
    })
  }, [currentTrack])

  return (
    <div>
      <Head>
        <title>Privacy Policy</title>
      </Head>

      <Layout>
        <div
          className="flex h-full w-full items-center justify-center"
          onClick={handlePlay}
        >
          <button>PLAY/PAUSE</button>
        </div>
      </Layout>
    </div>
  )
}
