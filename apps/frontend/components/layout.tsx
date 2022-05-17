import { useEffect, useState } from 'react'
import Header from '../components/Header'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function Layout({ children }) {
  const { width } = useWindowDimensions()
  const [showMobile, setShowMobile] = useState<boolean>(false)

  useEffect(() => {
    setShowMobile(width < 1160)
  }, [width])

  if (showMobile) {
    return (
      <div className="text-white flex items-center justify-center h-screen p-10">
        At the moment we are supporting desktop experience only. Mobile
        experience is currently under development.
      </div>
    )
  }
  return (
    <div>
      <Header />
      <div className="w-full p-10 mx-auto">{children}</div>
    </div>
  )
}
