import { render } from '@testing-library/react'
import { SplashScreen } from '.'

describe('SplashScreen component', () => {
  it('renders the splash screen', () => {
    render(<SplashScreen />)
    const splashScreen = document.querySelector(
      'div.flex.flex-col.justify-center.h-full.w-full'
    )
    expect(splashScreen).toBeInTheDocument()
  })
})
