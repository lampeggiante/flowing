import dayjs from 'dayjs'

const dateFormat = 'YYYY年MM月DD日HH时mm分ss秒'

export function now() {
  return dayjs().format(dateFormat)
}
