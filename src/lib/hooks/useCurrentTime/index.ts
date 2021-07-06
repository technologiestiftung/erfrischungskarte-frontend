export type NumberHourType =
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20

export const useCurrentTime = (): NumberHourType => {
  const coeff = 1000 * 60 * 60

  const berlinTime = new Date(
    new Date(Date.now()).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })
  )

  const roundedTime = new Date(
    Math.round(berlinTime.getTime() / coeff) * coeff
  ).getHours()

  if (roundedTime >= 10 && 20 >= roundedTime)
    return roundedTime as NumberHourType
  else if (roundedTime > 3 && 10 > roundedTime) return 10
  else return 20
}
