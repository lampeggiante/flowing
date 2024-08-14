export function getItem(key: string) {
  const storage = localStorage.getItem(key)
  try {
    const result = JSON.parse(storage!)
    return result
  } catch (e) {
    __DEV__ && console.error('localStorage读取值不为json格式', e)
    return storage
  }
}

export function setItem(key: string, value: string | object) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}
