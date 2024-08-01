import { forwardRef } from 'react'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import './button.scss'

interface FlowingButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children?: ReactNode
  className?: string
  prefixIcon?: ReactNode
  suffixIcon?: ReactNode
}

const FlowingButton = forwardRef<HTMLButtonElement, FlowingButtonProps>(
  (props, ref) => {
    const { children, className, prefixIcon, suffixIcon, ...rest } = props

    return (
      <button {...rest} className={`${className} flowing-button`} ref={ref}>
        {prefixIcon}
        {children}
        {suffixIcon}
      </button>
    )
  }
)

FlowingButton.displayName = 'FlowingButton'

export default FlowingButton
