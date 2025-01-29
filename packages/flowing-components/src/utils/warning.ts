export default function warning(
  condition: any,
  message: string,
  ...extra: any[]
) {
  if (process.env.NODE_ENV !== 'production' && console) {
    if (condition) {
      return console.error(
        `[@arco-design/web-react]: ${message}`,
        extra ? { detail: extra } : undefined
      )
    }
  }
}
