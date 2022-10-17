import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { useAudioContext } from '../context/AudioContext'

export default function Debug() {
  const { setAudio, currentTrack, setCurrentTrack, play } = useAudioContext()

  return (
    <div>
      <Layout>
        <div className=" text-white w-full flex items-center justify-center flex-col">
          <div
            className="p-5 bg-black rounded-full flex items-center justify-center mt-20"
            onClick={async () => {
              setCurrentTrack({ url: '/dummy/dummy.mp3', playOnLoad: true })
            }}
          >
            PLAY
          </div>
          <div className="p-5 bg-black rounded-full flex items-center justify-center mt-20">
            Pause
          </div>
        </div>
      </Layout>
    </div>
  )
}
