import { useState } from 'react'
export const useHasWebPSupport = (): boolean => {
  const [supported, setSupported] = useState(false)

  const kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha:
      'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation:
      'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  }

  if (typeof window !== 'undefined') {
    const img = new Image()

    img.onload = () => setSupported(img.width > 0 && img.height > 0)
    img.onerror = () => setSupported(false)

    img.src = 'data:image/webp;base64,' + kTestImages['lossy']
  }

  return supported
}
