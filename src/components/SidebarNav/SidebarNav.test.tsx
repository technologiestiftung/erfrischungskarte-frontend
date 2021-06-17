import { render, screen } from '@testing-library/react'
import { SidebarNav } from '.'
import * as nextRouter from 'next/router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('SidebarNav', () => {
  test('should render 3 links', () => {
    render(
      <SidebarNav hasMobileSize={true} isOpened={true} pathname="/about" />
    )

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(3)
  })
  test('should render no active link if no active page', () => {
    render(
      <SidebarNav hasMobileSize={false} isOpened={true} pathname="/nope" />
    )

    const activeLink = document.querySelector('.active')

    expect(activeLink).not.toBeInTheDocument()
  })
  test('should render an active link if active page', () => {
    render(
      <SidebarNav hasMobileSize={false} isOpened={true} pathname="/about" />
    )

    const activeLink = document.querySelector('.active')

    expect(activeLink).toBeInTheDocument()
  })
  test('should be slidden left if closed', () => {
    render(
      <SidebarNav hasMobileSize={false} isOpened={false} pathname="/about" />
    )

    const closed = document.querySelector('.closed')
    const opened = document.querySelector('.opened')

    expect(closed).toBeInTheDocument()
    expect(opened).not.toBeInTheDocument()
  })
  test('should be slidden right if opened', () => {
    render(
      <SidebarNav hasMobileSize={false} isOpened={true} pathname="/about" />
    )

    const closed = document.querySelector('.closed')
    const opened = document.querySelector('.opened')

    expect(closed).not.toBeInTheDocument()
    expect(opened).toBeInTheDocument()
  })
})
