import { cloneElement, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FlowingTooltipProps } from './types'

const FlowingTooltip = (props: FlowingTooltipProps) => {
  const {
    children,
    content,
    placement = 'bottom',
    tooltipCls = '',
    disabled = false,
    triggerType = 'hover',
    arrowShow = true
  } = props

  const [trigger, setTrigger] = useState<HTMLElement | null>(null)
  const [popover, setPopover] = useState<HTMLDivElement | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const setTriggerDom = (node: HTMLElement) => {
    if (node && node !== trigger) {
      setTrigger(node)
    }
  }

  const setPopoverDom = (node: HTMLDivElement) => {
    if (node && node !== popover) {
      setPopover(node)
    }
  }

  const triggerDom = cloneElement(children, {
    ref: setTriggerDom
  })

  const registerHoverEvent = useCallback(() => {}, [])

  useEffect(() => {
    if (triggerType === 'hover') {
      registerHoverEvent()
    }
  }, [trigger, popover])

  return (
    <div className="flowing-tooltip">
      <span className="flowing-tooltip-trigger">{triggerDom}</span>
      {createPortal(
        <div ref={setPopoverDom} className="" style={{}}>
          {content}
        </div>,
        document.body
      )}
    </div>
  )
}

FlowingTooltip.displayName = 'FlowingTooltip'

export default FlowingTooltip
