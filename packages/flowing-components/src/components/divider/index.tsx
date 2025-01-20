import React, { forwardRef } from 'react'
import { DividerProps } from './interface'
import { getDividerClassNames } from './cs'

const Divider = forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const {
    className,
    style,
    children,
    type = 'horizontal',
    contentPosition = 'center',
    ...rest
  } = props

  const classes = getDividerClassNames({
    type,
    contentPosition,
    hasChildren: !!children
  })

  return (
    <div ref={ref} className={classes} style={style} {...rest}>
      {children && <span>{children}</span>}
    </div>
  )
})

Divider.displayName = 'FlowingDivider'

export default Divider

export type { DividerProps }
