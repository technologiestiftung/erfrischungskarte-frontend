import { FC, SVGProps } from 'react'

export const WindIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line
      x1="0.5"
      y1="-0.5"
      x2="5.5"
      y2="-0.5"
      transform="matrix(-1 0 0 1 12 8)"
      stroke="#2879B9"
      strokeLinecap="round"
    />
    <line
      x1="0.5"
      y1="-0.5"
      x2="5.5"
      y2="-0.5"
      transform="matrix(-1 0 0 1 12 14)"
      stroke="#2879B9"
      strokeLinecap="round"
    />
    <line
      x1="0.5"
      y1="-0.5"
      x2="2.5"
      y2="-0.5"
      transform="matrix(-1 0 0 1 12 5)"
      stroke="#2879B9"
      strokeLinecap="round"
    />
    <line
      x1="0.5"
      y1="-0.5"
      x2="2.5"
      y2="-0.5"
      transform="matrix(-1 0 0 1 12 11)"
      stroke="#2879B9"
      strokeLinecap="round"
    />
    <line
      x1="14.5"
      y1="7.5"
      x2="14.5"
      y2="15.5"
      stroke="#2879B9"
      strokeLinecap="round"
    />
    <circle cx="14.5" cy="17.5" r="2" stroke="#2879B9" />
  </svg>
)
