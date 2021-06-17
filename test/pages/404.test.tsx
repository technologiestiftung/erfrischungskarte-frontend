import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { FourOFour } from '../../pages/404'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('FourOFour', () => {
  test('should render the statusCode and message', () => {
    render(<FourOFour />)

    const status = screen.getByText('400')
    const message = screen.getByText('Diese Seite wurde nicht gefunden')

    expect(status).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
