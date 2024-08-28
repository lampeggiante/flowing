import React, {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import classnames from 'classnames'
import { FlowingTooltipProps } from './types'
import './tooltip.scss'
import { getPopoverStyle } from './common'

const FlowingTooltip = (props: FlowingTooltipProps) => {
  const {
    children,
    content,
    placement = 'bottom',
    tooltipCls = '',
    disabled = false,
    delay = 200,
    triggerType = 'hover',
    arrowShow = true
  } = props

  const [trigger, setTrigger] = useState<HTMLElement | null>(null)
  const [popover, setPopover] = useState<HTMLDivElement | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const { offsetX, offsetY, arrowX, arrowY } = useMemo(
    () =>
      getPopoverStyle({
        trigger,
        popover,
        placement
      }),
    [trigger, popover, placement]
  )

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

  const registerHoverEvent = useCallback(() => {
    let timeout: number
    trigger?.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        setShow(false)
      }, delay)
    })
    trigger?.addEventListener('mouseenter', () => {
      clearTimeout(timeout)
      !show && setShow(true)
    })
    popover?.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        setShow(false)
      }, delay)
    })
    popover?.addEventListener('mouseenter', () => {
      clearTimeout(timeout)
      !show && setShow(true)
    })
  }, [trigger, popover, show, delay])

  const registerClickEvent = useCallback(() => {
    trigger?.addEventListener('click', () => {
      setShow(!show)
    })
  }, [trigger, popover, show, delay])

  useEffect(() => {
    if (triggerType === 'hover') {
      registerHoverEvent()
    } else {
      registerClickEvent()
    }
  }, [trigger, popover, triggerType])

  return (
    <div className="flowing-tooltip">
      <span className="flowing-tooltip-trigger">{triggerDom}</span>
      {show &&
        createPortal(
          <div
            ref={setPopoverDom}
            className={classnames('flowing-tooltip-popover', tooltipCls)}
            style={
              {
                left: offsetX,
                top: offsetY,
                opacity: !disabled && show ? 1 : 0,
                '--arrowX': arrowX + 'px',
                '--arrowY': arrowY + 'px',
                '--arrowShow': arrowShow ? 'block' : 'none'
              } as React.CSSProperties
            }
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  )
}

FlowingTooltip.displayName = 'FlowingTooltip'

export default FlowingTooltip
