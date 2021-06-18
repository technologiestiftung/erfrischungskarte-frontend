import { ChevronDown } from '@components/Icons/ChevronDown'
import classNames from 'classnames'
import { FC, ReactNode, useState } from 'react'

interface AccordionItemType {
  id: string
  title: string
  content: ReactNode
}

interface AccordionPropType {
  items: AccordionItemType[]
}

type StyleGetterType = (props: { isActive: boolean }) => Record<string, string>

const borderBottomStyle = 'border-b border-dashed border-gray-300'
const getStyles: StyleGetterType = ({ isActive }) => ({
  wrapper: classNames(
    !isActive && borderBottomStyle,
    'text-gray-800 relative z-0'
  ),
  title: classNames(
    'pt-4 block w-full font-bold text-left border border-white',
    'transition rounded focus:outline-none focus:z-10',
    'hover:bg-blue-50 group hover:border-blue-500',
    isActive ? 'pb-3' : 'pb-4'
  ),
  content: classNames(
    borderBottomStyle,
    'rounded m-0 pb-6 pt-0 overflow-hidden',
    'max-w-none w-full text-sm text-gray-500'
  ),
})

export const Accordion: FC<AccordionPropType> = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  return (
    <div>
      {items.map(({ id, title, content }) => {
        const isActive = id === activeItemId
        const classes = getStyles({ isActive })
        return (
          <div key={id} className={classes.wrapper}>
            <button
              className={classes.title}
              onClick={() => {
                if (activeItemId === id) return setActiveItemId(null)
                setActiveItemId(id)
              }}
              tabIndex={isActive ? 1 : 0}
            >
              <h2 className="group-hover:text-blue-500 inline">{title}</h2>
              <ChevronDown
                className={classNames(
                  'float-right transform transition-transform',
                  isActive ? 'rotate-180' : 'rotate-0'
                )}
              />
            </button>
            {isActive && (
              <p style={{ margin: 0 }} className={classes.content}>
                {content}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
