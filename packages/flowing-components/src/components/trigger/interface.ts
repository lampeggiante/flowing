import { CSSProperties, ReactNode } from 'react'

export interface TriggerProps {
  style?: CSSProperties
  className?: string | string[]
  popupStyle?: CSSProperties
  popupClassName?: string | string[]
  children: ReactNode
  popup: () => ReactNode
}
