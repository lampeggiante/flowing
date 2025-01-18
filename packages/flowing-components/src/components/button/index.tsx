import React, {
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  useMemo,
  useRef
} from 'react'
import { IconLoading } from '@flowing/icons'
import { ButtonProps } from './interface'
import { baseCls, ButtonBg } from './cs'
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
  const classes = classNames(baseCls, status && ButtonBg[status], className)

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
        {innerContent || 'FlowingButton'}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      {...rest}
      style={style}
      className={classes}
      disabled={disabled}
      type={htmlType}
      onClick={handleClick}
    >
      {innerContent || 'FlowingButton'}
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
