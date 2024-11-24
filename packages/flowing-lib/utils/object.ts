export function compareObject(a: any, b: any): boolean {
  const visited = new Set()
  function compare(a: any, b: any): boolean {
    if (a === b) return true
    if (a === null || b === null) return false
    if (typeof a !== 'object' || typeof b !== 'object') return false
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      return a.every((item, index) => compare(item, b[index]))
    }
    if (typeof a === 'object' && typeof b === 'object') {
      if (visited.has(a) || visited.has(b)) return true
      visited.add(a)
      visited.add(b)
      const aKeys = Object.keys(a)
      const bKeys = Object.keys(b)
      if (aKeys.length !== bKeys.length) return false
      return aKeys.every((key) => compare(a[key], b[key]))
    }
    return a === b
  }
  return compare(a, b)
}
