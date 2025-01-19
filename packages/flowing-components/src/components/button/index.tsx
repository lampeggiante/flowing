import React, {
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  useMemo,
  useRef
} from 'react'
import { IconLoading } from '@flowing/icons'
import { ButtonProps } from './interface'
import { getButtonClassNames } from './cs'

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
    () =>
      loading ? <IconLoading className="animate-spin-slow" /> : prefixIcon,
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

  const classes = useMemo(
    () =>
      getButtonClassNames({
        type,
        status,
        size,
        shape,
        iconOnly,
        long,
        loading,
        loadingFixedWidth,
        href,
        disabled
      }),
    [
      type,
      status,
      size,
      shape,
      iconOnly,
      long,
      loading,
      loadingFixedWidth,
      href,
      disabled
    ]
  )

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
