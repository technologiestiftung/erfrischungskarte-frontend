import { FC, SVGProps } from 'react'

export const ShadeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.5 4C3.5 3.72386 3.72386 3.5 4 3.5H6C6.27614 3.5 6.5 3.72386 6.5 4V20C6.5 20.2761 6.27614 20.5 6 20.5H4C3.72386 20.5 3.5 20.2761 3.5 20V4Z"
      stroke="#4F4F4F"
    />
    <line
      x1="8.70382"
      y1="4.06811"
      x2="22.0681"
      y2="20.2962"
      stroke="#4F4F4F"
      strokeLinecap="round"
    />
    <path
      d="M8.69999 10.3001L17.0681 20.2963"
      stroke="#4F4F4F"
      strokeLinecap="round"
    />
    <path
      d="M8.69995 16.2002L12.0681 20.2961"
      stroke="#4F4F4F"
      strokeLinecap="round"
    />
  </svg>
)
