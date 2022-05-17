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
      <div className="text-white flex items-center justify-center h-screen">
        This page supports desktop only currently.
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
