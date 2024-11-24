import { useState } from 'react'
import type { Placement } from './types'
import { compareObject } from '@flowing/lib'

interface GetTooltipStyleParams {
  /**
   *  trigger dom
   *  触发tooltip的dom元素
   */
  trigger: HTMLElement | null
  /**
   * tooltip dom
   * tooltip 元素
   */
  tooltip: HTMLElement | null
  /**
   * placement
   */
  placement: Placement
  /** 间距 */
  gap?: number
}

interface TooltipStyle {
  /**
   * tooltip x轴偏移量
   */
  offsetX: number
  /**
   * tooltip y轴偏移量
   */
  offsetY: number
  /**
   * tooltip 箭头x轴偏移量
   */
  arrowX: number
  /**
   * tooltip 箭头y轴偏移量
   */
  arrowY: number
}

type AlignPointTopBottom = 't' | 'b' | 'c'
type AlignPointLeftRight = 'l' | 'r' | 'c'
type AlignPoint = [
  topBottom: AlignPointTopBottom,
  leftRight: AlignPointLeftRight
]

type Rect = Record<
  'left' | 'top' | 'right' | 'bottom' | 'height' | 'width',
  number
>

function getAlignPoint(rect: Rect, position: AlignPoint) {
  let x: number
  let y: number
  const [topBottom, leftRight] = position

  if (leftRight === 'l') {
    x = rect.left
  } else if (leftRight === 'r') {
    x = rect.left + rect.width
  } else {
    x = rect.left + rect.width / 2
  }
  if (topBottom === 't') {
    y = rect.top
  } else if (topBottom === 'b') {
    y = rect.top + rect.height
  } else {
    y = rect.top + rect.height / 2
  }
  return { x, y }
}

const initStyle = {
  offsetX: 0,
  offsetY: 0,
  arrowX: 0,
  arrowY: 0
}

const initGap = 10

function getStyle(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: Placement,
  gap: number = initGap
): TooltipStyle {
  const { clientWidth, clientHeight, scrollLeft, scrollTop } =
    document.documentElement || document.body

  // 获取triggerDom八个点的位置
  const AlignPointLT = getAlignPoint(triggerRect, ['t', 'l'])
  const AlignPointL = getAlignPoint(triggerRect, ['c', 'l'])
  const AlignPointLB = getAlignPoint(triggerRect, ['b', 'l'])
  const AlignPointRT = getAlignPoint(triggerRect, ['t', 'r'])
  const AlignPointR = getAlignPoint(triggerRect, ['c', 'r'])
  // const AlignPointRB = getAlignPoint(triggerRect, ['b', 'r'])
  const AlignPointT = getAlignPoint(triggerRect, ['t', 'c'])
  const AlignPointB = getAlignPoint(triggerRect, ['b', 'c'])

  const newStyle: TooltipStyle = { ...initStyle }

  let [mainDirection] = placement.split('-')
  const isLeft = placement.includes('left')
  const isRight = placement.includes('right')
  const isTop = placement.includes('top')
  const isBottom = placement.includes('bottom')

  // 先计算主方向来判断是否超出屏幕，超出则再计算一遍
  function getOverStyle() {
    if (mainDirection === 'left') {
      newStyle.offsetX = AlignPointL.x - tooltipRect.width - gap
      newStyle.arrowX = tooltipRect.width - 6
      if (newStyle.offsetX < 0) {
        mainDirection = 'right'
        getOverStyle()
      }
    } else if (mainDirection === 'right') {
      newStyle.offsetX = AlignPointR.x + gap
      newStyle.arrowX = -4
      if (newStyle.offsetX + tooltipRect.width > clientWidth) {
        mainDirection = 'left'
        getOverStyle()
      }
    } else if (mainDirection === 'top') {
      newStyle.offsetY = AlignPointT.y - tooltipRect.height - gap
      newStyle.arrowY = tooltipRect.height - 6
      if (newStyle.offsetY < 0) {
        mainDirection = 'bottom'
        getOverStyle()
      }
    } else {
      newStyle.offsetY = AlignPointB.y + gap
      newStyle.arrowY = -4
      if (newStyle.offsetY + tooltipRect.height > clientHeight) {
        mainDirection = 'bottom'
        getOverStyle()
      }
    }
  }
  getOverStyle()

  // 再获取到其它的距离值
  if (mainDirection === 'left' || mainDirection === 'right') {
    if (isTop) {
      newStyle.offsetY = AlignPointLT.y
      newStyle.arrowY = tooltipRect.height * 0.45 - 4
    } else if (isBottom) {
      newStyle.offsetY = AlignPointLB.y - tooltipRect.height
      newStyle.arrowY = tooltipRect.height * 0.55 - 4
    } else {
      newStyle.offsetY = AlignPointL.y - tooltipRect.height / 2
      newStyle.arrowY = tooltipRect.height / 2 - 4
    }
  } else {
    if (isLeft) {
      newStyle.offsetX = AlignPointLT.x
      newStyle.arrowX = tooltipRect.width * 0.25 - 4
    } else if (isRight) {
      newStyle.offsetX = AlignPointRT.x - tooltipRect.width
      newStyle.arrowX = tooltipRect.width * 0.75 - 4
    } else {
      newStyle.offsetX = AlignPointT.x - tooltipRect.width / 2
      newStyle.arrowX = tooltipRect.width / 2 - 4
    }
  }

  // 最后加上页内偏移
  newStyle.offsetX += scrollLeft
  newStyle.offsetY += scrollTop

  return newStyle
}

export default function useTooltipStyle(params: GetTooltipStyleParams) {
  const { trigger, tooltip, placement, gap } = params
  const [style, setStyle] = useState({ ...initStyle })

  if (trigger && tooltip) {
    const triggerRect = trigger.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    const newStyle = getStyle(triggerRect, tooltipRect, placement, gap)
    if (!compareObject(newStyle, style)) {
      setStyle({ ...style, ...newStyle })
    }
  }

  return {
    computedStyle: style
  }
}
