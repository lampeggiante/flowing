import React, {
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react'
import { IconLoading } from '@flowing/icons'
import { ButtonGroupProps, ButtonProps } from './interface'
import { getButtonClassNames } from './cs'
import Group from './group'

const Button = forwardRef<any, ButtonProps>((props: ButtonProps, ref: any) => {
  const {
    style,
    className,
    children,
    htmlType,
    type,
    theme,
    size,
    shape,
    href,
    target,
    anchorProps,
    disabled,
    loading,
    prefixIcon,
    suffixIcon,
    pureCircle,
    long,
    onClick,
    ...rest
  } = props

  const innerRef = useRef(null)
  const buttonRef = ref ?? innerRef

  useImperativeHandle(ref, () => ({
    dom: buttonRef?.current,
    click: () => {
      buttonRef?.current?.click()
    }
  }))

  const prefixIconNode = useMemo(
    () => (loading ? <IconLoading className="animate-spin" /> : prefixIcon),
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
        theme,
        size,
        shape,
        pureCircle,
        long,
        loading,
        href,
        disabled
      }),
    [type, theme, size, shape, pureCircle, long, loading, href, disabled]
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
        {...anchorProps}
        href={href}
        target={target}
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
      style={style}
      className={classes}
      disabled={disabled}
      type={htmlType}
      onClick={handleClick}
    >
      {innerContent}
    </button>
  )
})

Button.displayName = 'FlowingButton'

const ButtonComponent = Button as typeof Button & {
  __FLOWING_BUTTON__: boolean
  Group: typeof Group
}

ButtonComponent.__FLOWING_BUTTON__ = true

ButtonComponent.Group = Group

export default ButtonComponent

export type { ButtonProps, ButtonGroupProps }
