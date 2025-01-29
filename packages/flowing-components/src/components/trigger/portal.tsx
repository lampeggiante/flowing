// only used by trigger. Plan to replace ../Portal

import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import useIsFirstRender from '../../hooks/use-is-first-render'

export interface PortalProps {
  /** Portal 挂载的容器 */
  getContainer: () => HTMLElement
  children?: React.ReactNode
}

const Portal = (props: PortalProps) => {
  const { getContainer, children } = props
  const containerRef = useRef<HTMLElement | null>(null)
  const isFirstRender = useIsFirstRender()

  if (isFirstRender || containerRef.current === null) {
    containerRef.current = getContainer()
  }

  useEffect(() => {
    return () => {
      const container = containerRef.current
      if (container && container.parentNode) {
        container.parentNode.removeChild(container)
        containerRef.current = null
      }
    }
  }, [])

  return containerRef.current
    ? ReactDOM.createPortal(children, containerRef.current)
    : null
}

export default Portal
