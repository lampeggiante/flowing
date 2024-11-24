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
import { getTooltipStyle } from './common'

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

  const { offsetX, offsetY, arrowX, arrowY } = useMemo(() => {
    if (!trigger || !tooltip) {
      return { offsetX: 0, offsetY: 0, arrowX: 0, arrowY: 0 }
    }
    return getTooltipStyle({
      trigger,
      tooltip,
      placement
    })
  }, [trigger, tooltip, placement])

  const tooltipStyle = useMemo(() => {
    const style = {
      left: offsetX,
      top: offsetY,
      opacity: !disabled && show ? 1 : 0,
      '--arrowX': arrowX + 'px',
      '--arrowY': arrowY + 'px',
      '--arrowShow': arrowShow ? 'visible' : 'hidden'
    } as React.CSSProperties

    return style
  }, [disabled, show, offsetX, offsetY, arrowX, arrowY, arrowShow])

  return (
    <div className="flowing-tooltip">
      <span className="flowing-tooltip-trigger">{triggerDom}</span>
      {createPortal(
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
