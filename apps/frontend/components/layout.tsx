import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuthContext } from '../context/AuthContext'
import { useAudioContext } from '../context/AudioContext'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function Layout({ children }) {
  const { width } = useWindowDimensions()

  return (
    <div>
      {width < 1160 ? (
        <div className="text-white flex items-center justify-center h-screen">
          This page supports desktop only currently.
        </div>
      ) : (
        <>
          <Header />
          <div className="w-full p-10 mx-auto">{children}</div>
        </>
      )}
    </div>
  )
}
