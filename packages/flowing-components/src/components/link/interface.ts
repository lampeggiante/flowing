import { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react'

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  className?: string | string[]
  style?: CSSProperties
  children: ReactNode
  /**
   * @description 是否显示链接图标
   */
  icon?: ReactNode | boolean
  /**
   * @description 链接的状态
   */
  status?: 'error' | 'warning' | 'success'
  /**
   * @description 链接是否禁用
   */
  disabled?: boolean
}
