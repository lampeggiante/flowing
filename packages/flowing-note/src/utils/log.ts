export function log(...args: any[]) {
  __DEV__ && console.log('[flowing-note-log]:', ...args)
}

export function error(...args: any[]) {
  __DEV__ && console.error('[flowing-note-error', ...args)
}

export function warn(...args: any[]) {
  __DEV__ && console.warn('[flowing-note-warning]', ...args)
}

export function info(...args: any[]) {
  __DEV__ && console.info('[flowing-note-info]', ...args)
}
