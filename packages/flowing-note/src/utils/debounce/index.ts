/** 共享同一个计时器 */
let timer: number | null = null

export function flowingDebounce(
  fn: Function,
  delay: number,
  firstCall = false
) {
  return function (...args: any[]) {
    if (timer) {
      console.log('清除了timer')
      window.clearTimeout(timer)
    }
    if (firstCall) {
      fn(...args)
      firstCall = false
    } else {
      timer = window.setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
}
