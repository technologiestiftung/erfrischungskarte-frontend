import { FC, ReactNode } from 'react'

interface FullScreenMapWrapperType {
  topLeft?: ReactNode
  topRight?: ReactNode
  bottomLeft?: ReactNode
  bottomRight?: ReactNode
}

export const FullScreenMapWrapper: FC<FullScreenMapWrapperType> = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
}) => {
  return (
    <div className="w-screen h-screen">
      {children}
      {topLeft && <div className="fixed top-4 left-4">{topLeft}</div>}
      {topRight && <div className="fixed top-4 right-4">{topRight}</div>}
      {bottomLeft && <div className="fixed bottom-4 left-4">{bottomLeft}</div>}
      {bottomRight && (
        <div className="fixed bottom-4 right-4">{bottomRight}</div>
      )}
    </div>
  )
}
