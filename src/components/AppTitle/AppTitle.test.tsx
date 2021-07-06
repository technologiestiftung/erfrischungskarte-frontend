import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { AppTitle } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('AppTitle', () => {
  test('should render the title', () => {
    render(<AppTitle />)

    const berliner = screen.getByText('Berliner')
    const erfrischungskarte = screen.getByText('Erfrischungskarte')

    expect(berliner).toBeInTheDocument()
    expect(erfrischungskarte).toBeInTheDocument()
  })
})
