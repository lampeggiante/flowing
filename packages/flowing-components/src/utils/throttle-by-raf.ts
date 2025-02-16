import { caf, raf } from './raf'

export default function throttleByRaf(callback: (...args: any[]) => void) {
  let timer: number | null = null
  const throttle = (...args: any[]) => {
    timer && caf(timer)
    timer = raf(() => {
      callback(...args)
      timer = null
    })
  }
  throttle.cancel = () => {
    timer && caf(timer)
    timer = null
  }
  return throttle
}
