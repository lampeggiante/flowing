import React, { forwardRef, useImperativeHandle } from 'react'
import { DividerProps } from './interface'
import { getDividerClassNames } from './cs'

const Divider = forwardRef<any, DividerProps>((props, ref: any) => {
  const {
    className,
    style,
    children,
    type = 'horizontal',
    contentPosition = 'center',
    ...rest
  } = props

  const { DividerCls: classes, textCls } = getDividerClassNames({
    type,
    contentPosition,
    hasChildren: !!children
  })

  useImperativeHandle(ref, () => ({
    dom: ref?.current
  }))

  return (
    <div ref={ref} className={classes} style={style} {...rest}>
      {children && <span className={textCls}>{children}</span>}
    </div>
  )
})

Divider.displayName = 'FlowingDivider'

export default Divider

export type { DividerProps }
