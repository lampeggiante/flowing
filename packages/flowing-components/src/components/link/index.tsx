import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { LinkProps } from './interface'
import { IconLink } from '@flowing/icons'
import { getLinkClassNames } from './cs'

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    className,
    style,
    children,
    icon,
    status,
    disabled,
    href,
    target,
    onClick,
    ...rest
  } = props

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    onClick?.(e)
  }

  const classes = classNames(
    getLinkClassNames({ status, disabled, href }),
    Array.isArray(className) ? className.join(' ') : className
  )

  const iconNode = icon === true ? <IconLink /> : icon
  const Tag = href ? 'a' : 'span'

  return (
    <Tag
      {...rest}
      ref={ref}
      className={classes}
      style={style}
      target={target ?? '_blank'}
      href={disabled ? undefined : href}
      onClick={handleClick}
    >
      {iconNode}
      {children}
    </Tag>
  )
})

Link.displayName = 'FlowingLink'

export default Link
