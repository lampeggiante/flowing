import type { Placement } from './types'
import { compareObject } from '@flowing/lib'

interface GetPopoverStyleParams {
  /**
   *  trigger dom
   *  触发popover的dom元素
   */
  trigger: HTMLElement | null
  /**
   * popover dom
   * popover 元素
   */
  popover: HTMLElement | null
  /**
   * placement
   */
  placement: Placement
}

interface PopoverStyle {
  /**
   * popover x轴偏移量
   */
  offsetX: number
  /**
   * popover y轴偏移量
   */
  offsetY: number
  /**
   * popover 箭头x轴偏移量
   */
  arrowX: number
  /**
   * popover 箭头y轴偏移量
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

function getStyle(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  placement: Placement
): PopoverStyle {
  const { clientWidth, clientHeight, scrollLeft, scrollTop } =
    document.documentElement || document.body

  // 获取triggerDom八个点的位置
  const AlignPointLT = getAlignPoint(triggerRect, ['t', 'l'])
  const AlignPointL = getAlignPoint(triggerRect, ['c', 'l'])
  const AlignPointLB = getAlignPoint(triggerRect, ['b', 'l'])
  const AlignPointRT = getAlignPoint(triggerRect, ['t', 'r'])
  const AlignPointR = getAlignPoint(triggerRect, ['c', 'r'])
  const AlignPointT = getAlignPoint(triggerRect, ['t', 'c'])
  const AlignPointB = getAlignPoint(triggerRect, ['b', 'c'])

  const newStyle: PopoverStyle = {
    offsetX: 0,
    offsetY: 0,
    arrowX: 0,
    arrowY: 0
  }

  let [mainDirection] = placement.split('-')
  const isLeft = placement.includes('left')
  const isRight = placement.includes('right')
  const isTop = placement.includes('top')
  const isBottom = placement.includes('bottom')

  // 先计算主方向来判断是否超出屏幕，超出则再计算一遍
  function getOverStyle(newStyle: PopoverStyle, hasTest = false) {
    if (mainDirection === 'left') {
      newStyle.offsetX = AlignPointL.x - popoverRect.width - 10
      newStyle.arrowX = popoverRect.width - 6
      if (newStyle.offsetX < 0 && !hasTest) {
        mainDirection = 'right'
        getOverStyle(newStyle, true)
      }
    } else if (mainDirection === 'right') {
      newStyle.offsetX = AlignPointR.x + 10
      newStyle.arrowX = -4
      if (newStyle.offsetX + popoverRect.width > clientWidth && !hasTest) {
        mainDirection = 'left'
        getOverStyle(newStyle, true)
      }
    } else if (mainDirection === 'top') {
      newStyle.offsetY = AlignPointT.y - popoverRect.height - 10
      newStyle.arrowY = popoverRect.height - 6
      if (newStyle.offsetY < 0 && !hasTest) {
        mainDirection = 'bottom'
        getOverStyle(newStyle, true)
      }
    } else {
      newStyle.offsetY = AlignPointB.y + 10
      newStyle.arrowY = -4
      if (newStyle.offsetY + popoverRect.height > clientHeight && !hasTest) {
        mainDirection = 'bottom'
        getOverStyle(newStyle, true)
      }
    }
  }
  getOverStyle(newStyle)

  // 再获取到其它的距离值
  if (mainDirection === 'left' || mainDirection === 'right') {
    if (isTop) {
      newStyle.offsetY = AlignPointLT.y
      newStyle.arrowY = popoverRect.height * 0.45 - 4
    } else if (isBottom) {
      newStyle.offsetY = AlignPointLB.y - popoverRect.height
      newStyle.arrowY = popoverRect.height * 0.55 - 4
    } else {
      newStyle.offsetY = AlignPointL.y - popoverRect.height / 2
      newStyle.arrowY = popoverRect.height / 2 - 4
    }
  } else {
    if (isLeft) {
      newStyle.offsetX = AlignPointLT.x
      newStyle.arrowX = popoverRect.width * 0.25 - 4
    } else if (isRight) {
      newStyle.offsetX = AlignPointRT.x - popoverRect.width
      newStyle.arrowX = popoverRect.width * 0.75 - 4
    } else {
      newStyle.offsetX = AlignPointT.x - popoverRect.width / 2
      newStyle.arrowX = popoverRect.width / 2 - 4
    }
  }

  // 最后加上页内偏移
  newStyle.offsetX += scrollLeft
  newStyle.offsetY += scrollTop

  return newStyle
}

export function getPopoverStyle(params: GetPopoverStyleParams): PopoverStyle {
  console.log('usePopoverStyle')
  const { trigger, popover, placement } = params
  const style = { ...initStyle }

  if (trigger && popover) {
    const triggerRect = trigger.getBoundingClientRect()
    const popoverRect = popover.getBoundingClientRect()

    const newStyle = getStyle(triggerRect, popoverRect, placement)
    if (!compareObject(newStyle, style)) {
      return { ...style, ...newStyle }
    }
  }
  return style
}
