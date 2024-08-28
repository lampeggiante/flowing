import { ReactElement, ReactNode } from 'react'

export type Placement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom'

export interface FlowingTooltipProps {
  /**
   * trigger of tooltip
   */
  children: ReactElement
  /**
   * content of tooltip
   */
  content?: string | ReactNode
  /**
   * position of tooltip
   */
  placement?: Placement
  /**
   * class name of tooltip
   */
  tooltipCls?: string
  /**
   * disabled tooltip
   */
  disabled?: boolean
  /**
   * delay of tooltip
   */
  delay?: number
  /**
   * trigger type of tooltip
   */
  triggerType: 'click' | 'hover'
  /**
   * option of show arrow for tooltip
   */
  arrowShow?: boolean
}
