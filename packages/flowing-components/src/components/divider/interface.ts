import { CSSProperties, ReactNode } from 'react'

export interface DividerProps {
  children?: ReactNode
  style?: CSSProperties
  className?: string
  /**
   * @description 分割线类型，水平还是垂直
   * @default 'horizontal'
   */
  type?: 'horizontal' | 'vertical'
  /**
   * @description 分割线文字的位置
   * @default 'center'
   */
  contentPosition?: 'left' | 'right' | 'center'
}
