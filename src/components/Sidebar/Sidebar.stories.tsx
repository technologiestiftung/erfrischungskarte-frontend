import { Story, Meta } from '@storybook/react'
import { ReactNode } from 'react'
import { withNextRouter } from 'storybook-addon-next-router'
import { Sidebar } from '.'

export default {
  title: 'UI Elements/Sidebar',
  component: Sidebar,
  decorators: [withNextRouter],
} as Meta

const Template: Story<{
  title?: string
  children?: ReactNode
}> = (args) => <Sidebar {...args} />

export const OpenedWithActiveTab = Template.bind({})
OpenedWithActiveTab.parameters = {
  nextRouter: {
    query: {},
    pathname: '/filters',
  },
}
OpenedWithActiveTab.args = {}

export const ClosedWithNoActiveTab = Template.bind({})
ClosedWithNoActiveTab.parameters = {
  nextRouter: {
    query: {},
    pathname: '/',
  },
}
ClosedWithNoActiveTab.args = {}

export const WithTitle = Template.bind({})
WithTitle.parameters = {
  nextRouter: {
    query: {},
    pathname: '/about',
  },
}
WithTitle.args = {
  title: 'About',
  children: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur arcu
      neque, condimentum eu ligula quis, porttitor aliquam nulla. Praesent purus
      neque, dignissim eget porttitor eu, vulputate a purus. Cras commodo tellus
      gravida tincidunt ultricies. Maecenas a eros enim. Ut sem diam, porta et
      metus sit amet, placerat vehicula neque. In ut placerat felis, sit amet
      varius risus. Pellentesque eu euismod nisl. Mauris et lobortis sem, eu
      blandit neque. Praesent et semper massa. Aliquam erat volutpat. Curabitur
      ornare cursus mauris, sit amet volutpat lacus condimentum non. Nullam
      vitae mauris a velit sagittis efficitur. Mauris finibus sapien sit amet
      mauris sollicitudin, vitae tincidunt lectus iaculis. Nam non iaculis
      augue. Sed tempus in lorem quis dignissim. Nulla vitae imperdiet lorem, eu
      tempus erat. Nulla sagittis risus arcu, tempor sagittis purus dictum ac.
      Donec feugiat risus vitae mauris porta vehicula. Etiam nec ante mi.
      Vivamus ac odio convallis, aliquet ligula id, euismod metus. Nam elementum
      facilisis est eget condimentum. Praesent non ullamcorper mauris. In
      finibus libero eget ex mollis facilisis. Ut lorem felis, sodales non nisi
      vel, tristique aliquam sapien. Donec est diam, bibendum sit amet sodales
      vel, ultricies non risus. Phasellus aliquam porttitor imperdiet. Nam
      pretium molestie nunc ac venenatis. Sed faucibus nibh id ex bibendum, eget
      sagittis mi sodales. Aliquam laoreet odio dui, vitae tincidunt quam
      rhoncus vitae. Aenean mauris lorem, consectetur nec efficitur vel, feugiat
      vitae quam. Quisque sodales fermentum urna in congue. Vivamus eleifend
      felis nec odio tempus sodales. Morbi egestas in nulla id pellentesque. Sed
      vel enim ligula. Nunc suscipit consectetur diam, a iaculis erat laoreet
      id. Aenean porta odio vel leo lobortis, accumsan fermentum ex aliquet. In
      hac habitasse platea dictumst. Fusce cursus, justo ut consectetur maximus,
      neque nunc sodales diam, vitae hendrerit turpis tellus sit amet sapien.
      Aliquam dapibus nulla leo, eget feugiat turpis sagittis non. Suspendisse
      ante turpis, dignissim in posuere quis, porta id leo. In tincidunt diam ut
      massa hendrerit sollicitudin non in magna. Vestibulum gravida arcu
      aliquet, sagittis ligula auctor, placerat diam. Vivamus porttitor semper
      massa non consequat. Vestibulum varius elit at ipsum gravida, sit amet
      lacinia orci convallis. Sed aliquet massa nec magna vehicula, sit amet
      auctor leo rhoncus. Aliquam eleifend augue ut eros accumsan ullamcorper.
      Morbi laoreet molestie eleifend. Aenean in nulla a eros tristique accumsan
      eu id est. Donec at hendrerit magna. Nulla vel convallis ipsum. Aenean
      enim est, iaculis ut ultricies at, facilisis sit amet purus. Sed ut
      consequat augue. Etiam scelerisque sagittis tincidunt. Phasellus tincidunt
      quis enim id convallis.
    </>
  ),
}
