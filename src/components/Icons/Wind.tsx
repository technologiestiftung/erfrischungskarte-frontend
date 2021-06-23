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
    <path
      d="M3 12H19.3077C19.3077 12 21.5 12 21.5 10C21.5 8 19.3077 8 19.3077 8"
      stroke="#2A924A"
      strokeLinecap="round"
    />
    <path
      d="M5 9H13.3077C13.3077 9 15.5 9 15.5 7C15.5 5 13.3077 5 13.3077 5"
      stroke="#2A924A"
      strokeLinecap="round"
    />
    <path
      d="M5 15H15.3077C15.3077 15 17.5 15 17.5 17C17.5 19 15.3077 19 15.3077 19"
      stroke="#2A924A"
      strokeLinecap="round"
    />
  </svg>
)
