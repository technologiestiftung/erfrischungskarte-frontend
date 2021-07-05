import { useEffect, useState } from 'react'

interface WindowSizeType {
  width: number | undefined
  height: number | undefined
}

interface WindowSizePayloadType {
  width: number | undefined
  height: number | undefined
}

const getWindowSize = (): WindowSizePayloadType => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

const setCssVariables = (): void => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  document.documentElement.style.setProperty('--screenHeight', `${100 * vh}px`)
  document.documentElement.style.setProperty(
    '--screenSemiHeight',
    `${50 * vh}px`
  )
}

export const useWindowSize = (): WindowSizeType => {
  const [windowSize, setWindowSize] = useState<WindowSizePayloadType>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize(): void {
      setCssVariables()
      setWindowSize(getWindowSize())
    }
    setCssVariables()
    setWindowSize(getWindowSize())

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
