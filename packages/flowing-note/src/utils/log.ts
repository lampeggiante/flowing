import { now } from './time'

export function log(...args: any[]) {
  __DEV__ && console.log(now(), '[flowing-note-log]\n', ...args)
}

export function error(...args: any[]) {
  __DEV__ && console.error(now(), '[flowing-note-error\n', ...args)
}

export function warn(...args: any[]) {
  __DEV__ && console.warn(now(), '[flowing-note-warning]\n', ...args)
}

export function info(...args: any[]) {
  __DEV__ && console.info(now(), '[flowing-note-info]\n', ...args)
}
