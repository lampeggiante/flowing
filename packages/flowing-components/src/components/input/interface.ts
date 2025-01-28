import {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  KeyboardEvent,
  FocusEvent,
  TextareaHTMLAttributes,
  ChangeEvent
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

export type AutoSizeType = {
  minRows?: number
  maxRows?: number
}

export interface TextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'className' | 'maxLength' | 'style' | 'prefix' | 'size'
  > {
  style?: CSSProperties
  className?: string | string[]
  wrapperStyle?: CSSProperties
  wrapperClassName?: string | string[]
  value?: string
  defaultValue?: string
  placeholder?: string
  maxLength?: number
  showWordLimit?: boolean
  allowClear?: boolean
  clearIcon?: ReactNode
  status?: 'default' | 'error' | 'warning'
  size?: 'small' | 'medium' | 'large' | 'default'
  disabled?: boolean
  readOnly?: boolean
  autoSize?: boolean | AutoSizeType
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onPressEnter?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  onClear?: () => void
  rows?: number
  cols?: number
}

export type RefTextAreaType = {
  dom: HTMLTextAreaElement
  focus: () => void
  blur: () => void
}
