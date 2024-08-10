export function flowingDebounce(
  fn: Function,
  delay: number,
  firstCall = false
) {
  let timer: number | null = null
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
