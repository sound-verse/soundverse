import Header from '../components/Header'
import Footer from '../components/Footer'
import MusicPlayer from './common/MusicPlayer'

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="w-full container mx-auto">{children}</div>
      {/* <MusicPlayer /> */}
      <Footer />
    </div>
  )
}