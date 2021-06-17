import { render } from '@testing-library/react'
import * as icons from '.'

describe('Icons', () => {
  test('should render all Icons', () => {
    Object.values(icons).forEach((Icon) => {
      render(<Icon />)
    })
  })
})
