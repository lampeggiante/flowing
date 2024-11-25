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
import useTooltipStyle from './common'

const FlowingTooltip = (props: FlowingTooltipProps) => {
  const {
    children,
    content,
    placement = 'bottom',
    tooltipCls = '',
    disabled = false,
    delay = 200,
    triggerType = 'hover',
    arrowShow = true,
    gap,
    showTooltip = true
  } = props

  const [trigger, setTrigger] = useState<HTMLElement | null>(null)
  const [tooltip, setTooltip] = useState<HTMLDivElement | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const setTriggerDom = (node: HTMLElement) => {
    if (node && node !== trigger) {
      setTrigger(node)
    }
  }

  const setTooltipDom = (node: HTMLDivElement) => {
    if (node && node !== tooltip) {
      setTooltip(node)
    }
  }

  const triggerDom = cloneElement(children, {
    ref: setTriggerDom
  })

  const registerHoverEvent = useCallback(() => {
    let timeout: number
    trigger?.addEventListener('mouseleave', () => {
      timeout = window.setTimeout(() => {
        setShow(false)
      }, delay)
    })
    trigger?.addEventListener('mouseenter', () => {
      clearTimeout(timeout)
      !show && setShow(true)
    })
    tooltip?.addEventListener('mouseleave', () => {
      timeout = window.setTimeout(() => {
        setShow(false)
      }, delay)
    })
    tooltip?.addEventListener('mouseenter', () => {
      clearTimeout(timeout)
      !show && setShow(true)
    })
  }, [trigger, tooltip, show, delay])

  const registerClickEvent = useCallback(() => {
    trigger?.addEventListener('click', () => {
      setShow(!show)
    })
  }, [trigger, tooltip, show, delay])

  useEffect(() => {
    if (triggerType === 'hover') {
      registerHoverEvent()
    } else {
      registerClickEvent()
    }
  }, [trigger, tooltip, triggerType])

  const { computedStyle } = useTooltipStyle({
    trigger,
    tooltip,
    placement,
    gap
  })

  const tooltipStyle = useMemo(() => {
    const { offsetX, offsetY, arrowX, arrowY } = computedStyle
    return {
      left: offsetX,
      top: offsetY,
      opacity: !disabled && show ? 1 : 0,
      '--arrowX': arrowX + 'px',
      '--arrowY': arrowY + 'px',
      '--arrowShow': arrowShow ? 'visible' : 'hidden'
    } as React.CSSProperties
  }, [disabled, show, computedStyle, arrowShow])

  if (!showTooltip) {
    return triggerDom
  }

  return (
    <div className="flowing-tooltip">
      <span className="flowing-tooltip-trigger">{triggerDom}</span>
      {show &&
        createPortal(
          <div
            ref={setTooltipDom}
            className={classnames('flowing-tooltip-tooltip', tooltipCls)}
            style={tooltipStyle}
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
