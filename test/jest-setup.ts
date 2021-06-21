/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fetch.resetMocks()
})

afterEach(() => {
  jest.restoreAllMocks()
})
