import { useEffect, useState } from 'react'

export const useHasMobileSize = (): boolean => {
  const [hasMobileSize, setHasMobileSize] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(max-width: 640px)')

    function screenTest(e: MediaQueryListEvent): void {
      setHasMobileSize(Boolean(e.matches))
    }

    setHasMobileSize(Boolean(mql.matches))

    try {
      mql.addEventListener('change', screenTest)
    } catch (e) {
      mql.addListener(screenTest)
    }
  }, [setHasMobileSize])

  return hasMobileSize
}
