import { useEffect, useRef, useState } from 'react'

interface WindowSizeType {
  width: number
  height: number
}

interface UseResizeReturnType extends WindowSizeType {
  updateWindowSize: () => void
}

const getWindowSize = (): WindowSizeType => ({
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

export const useWindowSize = (): UseResizeReturnType => {
  const updateWindowSize = useRef<UseResizeReturnType['updateWindowSize']>(
    () => undefined
  )
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: 1440,
    height: 960,
  })

  useEffect(() => {
    function handleResize(): void {
      setCssVariables()
      setWindowSize(getWindowSize())
    }
    handleResize()
    updateWindowSize.current = handleResize

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      updateWindowSize.current = () => undefined
    }
  }, [])

  return {
    ...windowSize,
    updateWindowSize: updateWindowSize.current,
  }
}
