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
        {prefixIcon && (
          <span className="flowing-button-prefix-icon">{prefixIcon}</span>
        )}
        {children && <span className="flowing-button-content">{children}</span>}
        {suffixIcon && (
          <span className="flowing-button-suffix-icon">{suffixIcon}</span>
        )}
      </button>
    )
  }
)

FlowingButton.displayName = 'FlowingButton'

export default FlowingButton
