/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.css'
declare module '*.module.css' {
  const styles: { [className: string]: string }
  export default styles
}
