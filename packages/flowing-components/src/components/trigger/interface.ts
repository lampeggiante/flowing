import { CSSProperties, ReactNode } from 'react'

export interface TriggerProps {
  style?: CSSProperties
  className?: string | string[]
  popupStyle?: CSSProperties
  popupClassName?: string | string[]
  children: ReactNode
  visible?: boolean
  defaultVisible?: boolean
  popup?: () => ReactNode
  getPopupContainer?: (node: HTMLElement | null) => Element
  getTargetDOMNode?: () => HTMLElement
}
