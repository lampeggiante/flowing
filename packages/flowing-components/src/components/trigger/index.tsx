import React, {
  createRef,
  CSSProperties,
  PureComponent,
  RefObject
} from 'react'
import { TriggerProps } from './interface'
import { caf, raf } from '../../utils/raf'
import { popupContainerStyle } from './constants'
import { findDOMNode } from '../../utils/react-dom'
import Portal from './portal'
export interface TriggerState {
  popupVisible: boolean
  popupStyle: CSSProperties
}

class Trigger extends PureComponent<TriggerProps, TriggerState> {
  static displayName = 'FlowingTrigger'
  state = {
    popupVisible: false,
    popupStyle: {}
  }
  triggerRef: RefObject<HTMLSpanElement>
  rootElementRef: RefObject<HTMLSpanElement | null>
  popupContainer: HTMLDivElement
  childrenDom: HTMLElement | null
  rafId: number
  isDidMount = false
  unmount = true
  getRootElement = () => {
    // eslint-disable-next-line react/no-find-dom-node
    this.childrenDom = findDOMNode(
      this.props.getTargetDOMNode?.() || this.rootElementRef,
      this
    )
    return this.childrenDom
  }
  appendToContainer = (node: HTMLDivElement) => {
    caf(this.rafId)
    if (this.isDidMount) {
      const { getPopupContainer } = this.props
      const rootElement = this.getRootElement()
      const parent = getPopupContainer?.(rootElement)
      if (parent) {
        parent.appendChild(node)
        return
      }
    }
    this.rafId = raf(() => {
      this.appendToContainer(node)
    })
  }
  getContainer = () => {
    const popupContainer = document.createElement('div')
    for (const key in popupContainerStyle) {
      popupContainer.style[key] = popupContainerStyle[key]
    }
    this.popupContainer = popupContainer
    this.appendToContainer(popupContainer)
    return popupContainer
  }
  constructor(props: TriggerProps) {
    super(props)
    const { visible, defaultVisible, popupStyle } = props
    this.state = {
      popupVisible: visible ?? defaultVisible ?? false,
      popupStyle: popupStyle ?? {}
    }
    this.triggerRef = createRef()
  }
  componentDidMount() {
    this.componentDidUpdate(this.props)
    this.isDidMount = true
    this.unmount = false
  }
  componentDidUpdate(_prevProps: Readonly<TriggerProps>) {
    // todo
  }
  onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    this.setState((prevState) => ({
      popupVisible: !prevState.popupVisible
    }))
  }
  render() {
    const { children, popup } = this.props
    if (!popup) {
      return null
    }
    const { popupVisible, popupStyle } = this.state

    return (
      <>
        {/* 触发器 */}
        <span onClick={this.onClick} ref={this.triggerRef}>
          {children}
        </span>
        {/* 弹出层 */}
        {popupVisible && (
          <Portal getContainer={this.getContainer}>
            <div style={popupStyle}>{popup()}</div>
          </Portal>
        )}
      </>
    )
  }
}

export default Trigger
