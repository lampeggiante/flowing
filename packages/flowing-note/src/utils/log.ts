import { now } from './time'

export function log(...args: any[]) {
  console.log(now(), '[flowing-note-log]\n', ...args)
}

export function error(...args: any[]) {
  console.error(now(), '[flowing-note-error\n', ...args)
}

export function warn(...args: any[]) {
  console.warn(now(), '[flowing-note-warning]\n', ...args)
}

export function info(...args: any[]) {
  console.info(now(), '[flowing-note-info]\n', ...args)
}
