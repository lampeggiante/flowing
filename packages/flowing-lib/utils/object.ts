export const compareObject = (obj1: any, obj2: any) => {
  // Check if both objects are null or undefined
  if (
    obj1 === null ||
    obj1 === undefined ||
    obj2 === null ||
    obj2 === undefined
  ) {
    return obj1 === obj2
  }

  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  // Check if both objects are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // Check if both arrays have the same length
    if (obj1.length !== obj2.length) {
      return false
    }

    // Check if both arrays have the same elements
    for (let i = 0; i < obj1.length; i++) {
      if (!compareObject(obj1[i], obj2[i])) {
        return false
      }
    }
  }
  // Check if both objects are objects
  else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    // Check if both objects have the same keys
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) {
      return false
    }

    // Check if both objects have the same values for each key
    for (const key of keys1) {
      if (!compareObject(obj1[key], obj2[key])) {
        return false
      }
    }
  }
  return false
}
