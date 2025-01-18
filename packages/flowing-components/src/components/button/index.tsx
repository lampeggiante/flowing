import React, {
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  useMemo,
  useRef
} from 'react'
import { IconLoading } from '@flowing/icons'
import { ButtonProps } from './interface'
import classNames from 'classnames'

const Button = (props: ButtonProps, ref: ForwardedRef<any>) => {
  const {
    style,
    className,
    children,
    htmlType,
    type,
    status,
    size,
    shape,
    href,
    anchorProps,
    disabled,
    loading,
    loadingFixedWidth,
    prefixIcon,
    suffixIcon,
    iconOnly,
    long,
    onClick,
    ...rest
  } = props

  const innerRef = useRef(null)
  const buttonRef = ref ?? innerRef

  const prefixIconNode = useMemo(
    () => (loading ? <IconLoading /> : prefixIcon),
    [loading, prefixIcon]
  )

  const innerContent = useMemo(
    () => (
      <>
        {prefixIconNode}
        {children}
        {suffixIcon}
      </>
    ),
    [prefixIconNode, children, suffixIcon]
  )

  const _type = type === 'default' ? 'secondary' : type
  const classes = classNames(['flowing-button', `flowing-button-${_type}`])

  const handleClick: MouseEventHandler<any> = (event: any) => {
    if (disabled || loading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  if (href) {
    return (
      <a
        ref={buttonRef}
        {...rest}
        style={style}
        className={classes}
        onClick={handleClick}
      >
        {innerContent}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      {...rest}
      disabled={disabled}
      type={htmlType}
      onClick={handleClick}
    >
      {innerContent}
    </button>
  )
}

const ForwardRefButton = forwardRef<any, ButtonProps>(Button)

const ButtonComponent = ForwardRefButton as typeof ForwardRefButton & {
  __FLOWING_BUTTON__: boolean
  // Group: typeof Group;
}

ButtonComponent.__FLOWING_BUTTON__ = true

ButtonComponent.displayName = 'FlowingButton'

export default ButtonComponent

export type { ButtonProps }
