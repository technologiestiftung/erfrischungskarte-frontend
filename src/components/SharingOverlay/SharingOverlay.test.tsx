import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { SharingOverlay } from '.'
import * as nextRouter from 'next/router'
import * as copyToClipboardHook from '@lib/hooks/useCopyToClipboard'

const useRouter = jest.fn()
const useCopyToClipboard = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
copyToClipboardHook.useCopyToClipboard = useCopyToClipboard.mockReturnValue({
  copyToClipboard: jest.fn(),
  hasCopied: false,
})

describe('SharingOverlay page', () => {
  it('render one link group without query params', () => {
    useRouter.mockReturnValue({
      query: {},
      push: jest.fn().mockResolvedValue(true),
      pathname: '/map',
    })
    render(<SharingOverlay />)

    const gmapsTitle = screen.queryByText('Google Maps')
    const h4s = screen.getAllByRole('heading', { level: 4 })

    expect(gmapsTitle).not.toBeInTheDocument()
    expect(h4s).toHaveLength(1)
  })
  it('render two link groups with query params', () => {
    useRouter.mockReturnValue({
      query: {
        latitude: '15.22412',
        longitude: '14.1241242',
        zoom: '12',
      },
      push: jest.fn().mockResolvedValue(true),
      pathname: '/map',
    })
    render(<SharingOverlay />)

    const gmapsTitle = screen.queryByText('Google Maps')
    const h4s = screen.getAllByRole('heading', { level: 4 })

    expect(gmapsTitle).toBeInTheDocument()
    expect(h4s).toHaveLength(2)
  })
  it('clicking on the x button should call the onClose fnc', () => {
    useRouter.mockReturnValue({
      query: {},
      push: jest.fn().mockResolvedValue(true),
      pathname: '/map',
    })
    const testOnClose = jest.fn()
    render(<SharingOverlay onClose={testOnClose} />)

    const closeButton = screen.getByRole('button', { name: '' })

    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)

    expect(testOnClose).toHaveBeenCalled()
  })
  it('clicking on a copy link button should call copy fnc', () => {
    useRouter.mockReturnValue({
      query: {},
      push: jest.fn().mockResolvedValue(true),
      pathname: '/map',
    })
    const testCopyToClipboard = jest.fn()
    useCopyToClipboard.mockReturnValue({
      copyToClipboard: testCopyToClipboard,
    })
    const testOnClose = jest.fn()
    render(<SharingOverlay onClose={testOnClose} />)

    const linkButton = screen.getByRole('button', { name: 'Link kopieren' })

    expect(linkButton).toBeInTheDocument()

    fireEvent.click(linkButton)

    expect(testCopyToClipboard).toHaveBeenCalled()
  })
  it('clicking on a copy link should show "Link kopiert" text', () => {
    useRouter.mockReturnValue({
      query: {},
      push: jest.fn().mockResolvedValue(true),
      pathname: '/map',
    })
    useCopyToClipboard.mockReturnValue({
      hasCopied: true,
    })
    const testOnClose = jest.fn()
    render(<SharingOverlay onClose={testOnClose} />)

    const linkButton = screen.getByRole('button', { name: 'Link kopiert!' })

    expect(linkButton).toBeInTheDocument()
  })
  it('onClose should have a default if not provided', () => {
    useRouter.mockReturnValue({
      query: {},
      push: jest.fn().mockResolvedValue(true),
      pathname: '/map',
    })
    render(<SharingOverlay />)

    const closeButton = screen.getByRole('button', { name: '' })

    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)
  })
})
