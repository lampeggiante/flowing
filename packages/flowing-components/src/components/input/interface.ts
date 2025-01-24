import {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  KeyboardEvent,
  FocusEvent
} from 'react'

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'prefix' | 'className' | 'size' | 'height' | 'maxLength'
  > {
  className?: string | string[]
  style?: CSSProperties
  beforeStyle?: CSSProperties
  afterStyle?: CSSProperties
  beforeClassName?: string | string[]
  afterClassName?: string | string[]
  prefixStyle?: CSSProperties
  suffixStyle?: CSSProperties
  prefixClassName?: string | string[]
  suffixClassName?: string | string[]
  value?: string
  allowClear?: boolean
  disabled?: boolean
  readOnly?: boolean
  defaultValue?: string
  placeholder?: string
  status?: 'default' | 'error' | 'warning'
  addBefore?: ReactNode
  addAfter?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  size?: 'small' | 'medium' | 'large' | 'default'
  height?: number
  maxLength?: number
  showWordLimit?: boolean
  onChange?: (value: string) => void
  onClear?: () => void
  onPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

export type RefInputType = {
  /** 使输入框失去焦点 */
  blur: () => void
  /** 使输入框获取焦点 */
  focus: () => void
  /** input dom元素 */
  dom: HTMLInputElement
}
