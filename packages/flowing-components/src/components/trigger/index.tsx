import React, { CSSProperties, PureComponent, RefObject } from 'react'
import { TriggerProps } from './interface'

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
  private onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    this.setState((prevState) => ({
      popupVisible: !prevState.popupVisible
    }))
  }
  // private triggerRef: RefObject<HTMLSpanElement | null>
  // constructor(props: TriggerProps) {
  //   super(props)
  //   this.state = {
  //     popupVisible: false,
  //     popupStyle: {}
  //   }
  // }
  render() {
    const { children, popup } = this.props
    const { popupVisible, popupStyle } = this.state

    return (
      <>
        {/* 触发器 */}
        <span onClick={this.onClick}>{children}</span>
        {/* 弹出层 */}
        {popupVisible && <div style={popupStyle}>{popup()}</div>}
      </>
    )
  }
}

export default Trigger
