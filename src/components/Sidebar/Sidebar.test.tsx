import { render, screen } from '@testing-library/react'
import { Sidebar } from '.'
import * as nextRouter from 'next/router'

const testRouter = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = testRouter.mockReturnValue({
  query: {},
})

describe('SidebarNav', () => {
  test('should render its children', () => {
    render(
      <Sidebar>
        <button>Buongiorno</button>
      </Sidebar>
    )

    const button = screen.getByRole('button', { name: 'Buongiorno' })

    expect(button).toBeInTheDocument()
  })
  test('should render the title', () => {
    render(<Sidebar title="Hello" />)

    const headline = screen.getByRole('heading', { name: 'Hello' })

    expect(headline).toBeInTheDocument()
  })
  test('should render 3 links', () => {
    render(<Sidebar />)

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(3)
  })
  test('should render no active link if no active page', () => {
    testRouter.mockReturnValue({
      query: {},
      pathname: '/nope',
    })
    render(<Sidebar />)

    const activeLink = document.querySelector('.active')

    expect(activeLink).not.toBeInTheDocument()
  })
  test('should render an active link if active page', () => {
    testRouter.mockReturnValue({
      query: {},
      pathname: '/about',
    })
    render(<Sidebar />)

    const activeLink = document.querySelector('.active')

    expect(activeLink).toBeInTheDocument()
  })
  test('should be slidden left if closed', () => {
    testRouter.mockReturnValue({
      query: {},
      pathname: '/',
    })
    render(<Sidebar />)

    const closed = document.querySelector('.closed')
    const opened = document.querySelector('.opened')

    expect(closed).toBeInTheDocument()
    expect(opened).not.toBeInTheDocument()
  })
  test('should be slidden right if opened', () => {
    testRouter.mockReturnValue({
      query: {},
      pathname: '/about',
    })
    render(<Sidebar />)

    const closed = document.querySelector('.closed')
    const opened = document.querySelector('.opened')

    expect(closed).not.toBeInTheDocument()
    expect(opened).toBeInTheDocument()
  })
})
