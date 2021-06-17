import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'
import * as nextRouter from 'next/router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

initStoryshots({
  test: multiSnapshotWithOptions(),
})
