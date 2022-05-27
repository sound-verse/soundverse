import { useEffect, useState } from 'react'
import Header from '../components/Header'
import useWindowDimensions from '../hooks/useWindowDimensions'
import cn from 'classnames'

export default function Layout({ className = '', children }) {
  const { width } = useWindowDimensions()
  const [showMobile, setShowMobile] = useState<boolean>(false)

  useEffect(() => {
    setShowMobile(width < 1280)
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
    <div
      className={cn(
        'mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl',
        className
      )}
    >
      <Header />
      <div className="p-10">{children}</div>
    </div>
  )
}
