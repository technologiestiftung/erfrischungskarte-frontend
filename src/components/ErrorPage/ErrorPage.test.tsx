import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { ErrorPage } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('ErrorPage', () => {
  test('should render the statusCode and message', () => {
    render(<ErrorPage statusCode={123} message="hello" />)

    const status = screen.getByText('123')
    const message = screen.getByText('hello')

    expect(status).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
