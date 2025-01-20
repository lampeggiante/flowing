import React, { forwardRef } from 'react'
import { ButtonGroupProps } from './interface'

const Group = (
  { className, style, children, ...rest }: ButtonGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => (
  <div ref={ref} className={className} style={style} {...rest}>
    {children}
  </div>
)

const GroupComponent = forwardRef<HTMLDivElement, ButtonGroupProps>(Group)

GroupComponent.displayName = 'FlowingButtonGroup'

export default GroupComponent
