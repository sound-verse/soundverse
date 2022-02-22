import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuthContext } from '../context/AuthContext'

export default function Layout({ children }) {
  const { authUser } = useAuthContext()
  return (
    <div>
      <Header />
      {process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' || authUser ? (
        <div className="w-full p-10 mx-auto">{children}</div>
      ) : (
        <div className="text-white text-2xl font-bold flex h-screen justify-center self-center items-center -mt-36">
          Only authorized wallets are able to use this page.
        </div>
      )}
    </div>
  )
}
