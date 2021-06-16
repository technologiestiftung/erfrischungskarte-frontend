import { fireEvent, render, screen } from '@testing-library/react'
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
  test('should have a shadowed header if scrolled', () => {
    render(
      <Sidebar title="Title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur arcu
        neque, condimentum eu ligula quis, porttitor aliquam nulla. Praesent
        purus neque, dignissim eget porttitor eu, vulputate a purus. Cras
        commodo tellus gravida tincidunt ultricies. Maecenas a eros enim. Ut sem
        diam, porta et metus sit amet, placerat vehicula neque. In ut placerat
        felis, sit amet varius risus. Pellentesque eu euismod nisl. Mauris et
        lobortis sem, eu blandit neque. Praesent et semper massa. Aliquam erat
        volutpat. Curabitur ornare cursus mauris, sit amet volutpat lacus
        condimentum non. Nullam vitae mauris a velit sagittis efficitur. Mauris
        finibus sapien sit amet mauris sollicitudin, vitae tincidunt lectus
        iaculis. Nam non iaculis augue. Sed tempus in lorem quis dignissim.
        Nulla vitae imperdiet lorem, eu tempus erat. Nulla sagittis risus arcu,
        tempor sagittis purus dictum ac. Donec feugiat risus vitae mauris porta
        vehicula. Etiam nec ante mi. Vivamus ac odio convallis, aliquet ligula
        id, euismod metus. Nam elementum facilisis est eget condimentum.
        Praesent non ullamcorper mauris. In finibus libero eget ex mollis
        facilisis. Ut lorem felis, sodales non nisi vel, tristique aliquam
        sapien. Donec est diam, bibendum sit amet sodales vel, ultricies non
        risus. Phasellus aliquam porttitor imperdiet. Nam pretium molestie nunc
        ac venenatis. Sed faucibus nibh id ex bibendum, eget sagittis mi
        sodales. Aliquam laoreet odio dui, vitae tincidunt quam rhoncus vitae.
        Aenean mauris lorem, consectetur nec efficitur vel, feugiat vitae quam.
        Quisque sodales fermentum urna in congue. Vivamus eleifend felis nec
        odio tempus sodales. Morbi egestas in nulla id pellentesque. Sed vel
        enim ligula. Nunc suscipit consectetur diam, a iaculis erat laoreet id.
        Aenean porta odio vel leo lobortis, accumsan fermentum ex aliquet. In
        hac habitasse platea dictumst. Fusce cursus, justo ut consectetur
        maximus, neque nunc sodales diam, vitae hendrerit turpis tellus sit amet
        sapien. Aliquam dapibus nulla leo, eget feugiat turpis sagittis non.
        Suspendisse ante turpis, dignissim in posuere quis, porta id leo. In
        tincidunt diam ut massa hendrerit sollicitudin non in magna. Vestibulum
        gravida arcu aliquet, sagittis ligula auctor, placerat diam. Vivamus
        porttitor semper massa non consequat. Vestibulum varius elit at ipsum
        gravida, sit amet lacinia orci convallis. Sed aliquet massa nec magna
        vehicula, sit amet auctor leo rhoncus. Aliquam eleifend augue ut eros
        accumsan ullamcorper. Morbi laoreet molestie eleifend. Aenean in nulla a
        eros tristique accumsan eu id est. Donec at hendrerit magna. Nulla vel
        convallis ipsum. Aenean enim est, iaculis ut ultricies at, facilisis sit
        amet purus. Sed ut consequat augue. Etiam scelerisque sagittis
        tincidunt. Phasellus tincidunt quis enim id convallis.
      </Sidebar>
    )

    const scrolledHeaderBefore = document.querySelector('.shadow-md.sticky')

    expect(scrolledHeaderBefore).not.toBeInTheDocument()

    const container = document.getElementById('sidebar-scroll-container')
    expect(container).toBeInTheDocument()
    if (!container) throw 'No scroll container found!'

    container.scrollTop = 100
    fireEvent.scroll(container, { target: container })

    expect(container.scrollTop).toBe(100)
    const scrolledHeaderAfter = document.querySelector('.shadow-md.sticky')

    expect(scrolledHeaderAfter).toBeInTheDocument()

    container.scrollTop = 0
    fireEvent.scroll(container, { target: container })

    expect(container.scrollTop).toBe(0)
    const scrolledHeaderBack = document.querySelector('.shadow-md.sticky')

    expect(scrolledHeaderBack).not.toBeInTheDocument()
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
