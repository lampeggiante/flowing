import dayjs from 'dayjs'

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

export function now() {
  return dayjs().format(dateFormat)
}
