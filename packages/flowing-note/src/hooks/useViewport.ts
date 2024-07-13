let vw: number
let vh: number

export function useViewPort() {
  if (!document) return { vw: 0, vh: 0 }
  if (document && !vw && !vh) {
    vw = document.documentElement.clientWidth
    vh = document.documentElement.clientHeight
  }
  return {
    vw,
    vh
  }
}
