import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import { useRouter } from 'next/router'

export default function Debug() {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const WavesurferLibrary = useRef(null)

  const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: 'grey',
    progressColor: 'black',
    cursorColor: 'black',
    height: 50,
    pixelRatio: 1,
    normalize: true,
    barWidth: 1,
    barGap: 1,
    backend: 'MediaElement',
  })

  useEffect(() => {
    if (!wavesurfer.current) {
      //   create()
    }
  }, [])

  const create = async () => {
    if (!WavesurferLibrary.current) {
      WavesurferLibrary.current = await (await import('wavesurfer.js')).default
    }

    if (wavesurfer.current) {
      await wavesurfer.current.destroy()
    }

    wavesurfer.current = await new WavesurferLibrary.current.create(
      formWaveSurferOptions(waveformRef.current)
    )

    wavesurfer.current.load('/dummy/dummy.mp3')
  }

  return (
    <div>
      <Layout>
        <div ref={waveformRef} />

        <div className=" text-white w-full flex items-center justify-center flex-col">
          <div
            className="p-5 bg-black rounded-full flex items-center justify-center mt-20"
            onClick={async () => {
              await create()
              wavesurfer.current.play()
            }}
          >
            PLAY
          </div>
          <div
            className="p-5 bg-black rounded-full flex items-center justify-center mt-20"
            onClick={() => {
              wavesurfer.current.pause()
            }}
          >
            Pause
          </div>
        </div>
      </Layout>
    </div>
  )
}
