import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuthContext } from '../context/AuthContext'
import { useAudioContext } from '../context/AudioContext'

export default function Layout({ children }) {
  const { authUser } = useAuthContext()
  const { currentTrack } = useAudioContext()

  return (
    <div>
      <Header />
      <div className="w-full p-10 mx-auto">{children}</div>
    </div>
  )
}
