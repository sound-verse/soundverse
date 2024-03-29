import { useState, useEffect } from 'react'

function getWindowDimensions() {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
    }
  }
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )
  const [isMobile, setIsMobile] = useState(false)
  const [isResponsive, setIsResponsive] = useState(false)

  useEffect(() => {
    const isMobile = windowDimensions.width < 1024
    const isResponsive = windowDimensions.width < 1280
    setIsMobile(isMobile)
    setIsResponsive(isResponsive)
  }, [windowDimensions])

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { windowDimensions, isMobile, isResponsive }
}
