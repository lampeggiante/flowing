// import { forwardRef } from 'react'
// import type { ReactNode } from 'react'

// interface FlowingButtonProps {
//   children: ReactNode
// }

// const FlowingButton = forwardRef<HTMLButtonElement, FlowingButtonProps>(
//   (props, ref) => {
//     const { children, ...rest } = props

//     return <button {...rest}>{children}</button>
//   }
// )

// FlowingButton.displayName = 'FlowingButton'

import { Button } from 'antd'

const FlowingButton = Button

export default FlowingButton
