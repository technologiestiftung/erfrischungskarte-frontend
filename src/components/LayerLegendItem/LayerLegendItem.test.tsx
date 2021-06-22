import { render, screen } from '@testing-library/react'
import { LayerLegendItem } from '.'
import { WindIcon } from '@components/Icons'
import * as nextRouter from 'next/router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

const testContent = {
  title: 'I am a title',
  description: 'I am a description for this legend item.',
  icon: <WindIcon className="transform scale-125" id="icon" />,
  legendContent: <p>Fill this with the actual legend</p>,
}

describe('LayerLegendItem', () => {
  it('renders title and description', () => {
    render(
      <LayerLegendItem
        title={testContent.title}
        description={testContent.description}
        icon={testContent.icon}
        legendContent={testContent.legendContent}
      />
    )

    const title = screen.getByRole('heading', {
      level: 3,
      name: /I am a title/i,
    })
    expect(title).toBeInTheDocument()

    const description = screen.getByText(
      /I am a description for this legend item./i
    )
    expect(description).toBeInTheDocument()
  })

  it('renders a provided icon', () => {
    render(
      <LayerLegendItem
        title={testContent.title}
        description={testContent.description}
        icon={testContent.icon}
        legendContent={testContent.legendContent}
      />
    )

    const icon = document.querySelector('#icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders the legend content', () => {
    render(
      <LayerLegendItem
        title={testContent.title}
        description={testContent.description}
        icon={testContent.icon}
        legendContent={testContent.legendContent}
      />
    )

    const legendContent = screen.getByText(/Fill this with the actual legend/i)
    expect(legendContent).toBeInTheDocument()
  })
})
