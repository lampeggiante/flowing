import { log } from './log'

export function getItem(key: string) {
  const storage = localStorage.getItem(key)
  log(`getItem: ${key}`, storage)
  try {
    const result = JSON.parse(storage!)
    return result
  } catch (e) {
    return storage
  }
}

export function setItem(key: string, value: string | object) {
  log(`setItem: ${key}`, value)
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}
