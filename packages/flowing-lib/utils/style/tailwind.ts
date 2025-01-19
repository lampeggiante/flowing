/** 去除空类名 */
export const cs = (
  className: string | undefined | (string | undefined)[]
): string[] => {
  if (typeof className === 'string') {
    return [className]
  }
  if (!className || !className.length) return []
  const finalClassNames: string[] = []
  for (const item of className) {
    if (!item) continue
    const allItems = item.split(' ')
    for (const i of allItems) {
      if (!i) continue
      finalClassNames.push(i)
    }
  }
  return finalClassNames
}
