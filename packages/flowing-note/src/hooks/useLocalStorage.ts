function isFunction(val: unknown): boolean {
  return Object.toString.call(val) === '[object Function]'
}

function isObject(val: unknown): boolean {
  return Object.toString.call(val) === '[object Object]'
}

function moveFunction(val: any) {
  if (!isObject(val)) return
  const newVal: any = {}
  for (const key in Object.keys(val)) {
    if (isFunction(val[key])) continue
    newVal[key] = val[key]
    if (isObject(val[key])) newVal[key] = moveFunction(val[key])
  }
  return newVal
}

/**
 * 在 localStorage 中只存储对象（不包括数组）数据
 *   - 一定要保留键值对
 * 在存储时，会去除所有的函数存储
 */
export function useLocalStorage() {
  return {
    setItem: (key: string, value: any): void => {
      const newVal = moveFunction(value)
      localStorage.setItem(key, JSON.stringify(newVal))
    },
    getItem: (key: string): any => {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }
  }
}
