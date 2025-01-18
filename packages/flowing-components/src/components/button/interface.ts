import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLProps,
  ReactNode
} from 'react'

/** 基础按钮属性 */
export interface BaseButtonProps {
  style?: CSSProperties
  className?: string | string[]
  children?: ReactNode
  /**
   * @description 按钮类型
   * @default default
   * @type default | primary | secondary | dashed | text | outline
   */
  type?: 'default' | 'primary' | 'secondary' | 'dashed' | 'text' | 'outline'
  /**
   * @description 按钮状态
   * @default default
   * @type warning | danger |success | default | info
   */
  status?: 'warning' | 'danger' | 'success' | 'default' | 'info'
  /**
   * @description 按钮尺寸
   * @default default
   * @type default | small | large
   */
  size?: 'mini' | 'small' | 'default' | 'large'
  /**
   * @description 按钮形状
   * @default square
   * @type square | round |circle
   */
  shape?: 'circle' | 'round' | 'square'
  /**
   * @description 添加跳转连接，变得和a标签一致
   * @type string
   */
  href?: string
  /**
   * @description 跳转方式
   * @type string
   */
  target?: string
  /**
   * @description a 标签的原生属性
   */
  anchorProps?: HTMLProps<HTMLAnchorElement>
  /**
   * @description 按钮是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @description 按钮是否加载中
   * @default false
   */
  loading?: boolean
  /**
   * @description 按钮加载中是否固定宽度
   * @default false
   */
  loadingFixedWidth?: boolean
  /**
   * @description 文字前的icon
   * @type ReactNode
   */
  prefixIcon?: ReactNode
  /**
   * @description 文字后的icon
   * @type ReactNode
   */
  suffixIcon?: ReactNode
  /**
   * @description 是否只显示icon
   */
  iconOnly?: boolean
  /**
   * @description 按钮宽度撑满容器
   * @default true
   */
  long?: boolean
  /**
   * @description 点击事件
   */
  onClick?: (e: MouseEvent) => void
}

export type AnchorButtonProps = {
  href: string
  target?: string
  anchorProps?: HTMLProps<HTMLAnchorElement>
} & BaseButtonProps &
  Omit<AnchorHTMLAttributes<any>, 'type' | 'onClick' | 'className'>

export type FinalButtonProps = {
  /**
   * @zh 按钮原生的 html type 类型
   * @en html button type
   * @defaultValue button
   */
  htmlType?: 'button' | 'submit' | 'reset'
} & BaseButtonProps &
  Omit<ButtonHTMLAttributes<any>, 'type' | 'onClick' | 'className'>

/**
 * @title Button
 */
export type ButtonProps = Partial<FinalButtonProps & AnchorButtonProps>

export interface ButtonGroupProps {
  style?: CSSProperties
  className?: string | string[]
  children?: ReactNode
}
