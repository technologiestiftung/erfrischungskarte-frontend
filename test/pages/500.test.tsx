import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { FiveHundred } from '../../pages/500'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('FiveHundred', () => {
  test('should render the statusCode and message', () => {
    render(<FiveHundred />)

    const status = screen.getByText('500')
    const message = screen.getByText('Interne Server Fehler')

    expect(status).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
