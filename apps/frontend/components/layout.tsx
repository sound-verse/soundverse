import Header from './Header/Header'
import cn from 'classnames'
import useWindowDimensions from '../hooks/useWindowDimensions'
import MobileHeader from './MobileHeader/MobileHeader'
import { useEffect, useState } from 'react'

export default function Layout({ className = '', children }) {
  const { isMobile } = useWindowDimensions()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setShowMobileMenu(true)
    } else {
      setShowMobileMenu(false)
    }
  }, [isMobile])

  return (
     <div className="flex items-center justify-center w-full h-screen">
       We will be on mainnet in a few days, sit tight!
     </div>
   // <div>
   //   {showMobileMenu ? <MobileHeader /> : <Header />}
   //   <div
   //     className={cn(
   //       'mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl',
   //       className
   //     )}
   //   >
   //     <div className="p-4 sm:p-10">{children}</div>
    //  </div>
   // </div>
  )
}
