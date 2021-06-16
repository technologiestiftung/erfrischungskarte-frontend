import { forwardRef, HTMLProps, ReactNode } from 'react'

export interface FullScreenMapWrapperType extends HTMLProps<HTMLDivElement> {
  topLeft?: ReactNode
  topRight?: ReactNode
  bottomLeft?: ReactNode
  bottomRight?: ReactNode
}

// eslint-disable-next-line react/display-name
export const FullScreenMapWrapper = forwardRef<
  HTMLDivElement,
  FullScreenMapWrapperType
>(
  (
    { topLeft, topRight, bottomLeft, bottomRight, children, ...otherProps },
    ref
  ) => {
    return (
      <div className="w-screen h-screen" ref={ref} {...otherProps}>
        {children}
        {topLeft && <div className="fixed top-4 left-4">{topLeft}</div>}
        {topRight && <div className="fixed top-4 right-4">{topRight}</div>}
        {bottomLeft && (
          <div className="fixed bottom-4 left-4">{bottomLeft}</div>
        )}
        {bottomRight && (
          <div className="fixed bottom-4 right-4">{bottomRight}</div>
        )}
      </div>
    )
  }
)
