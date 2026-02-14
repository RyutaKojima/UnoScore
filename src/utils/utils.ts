export const deepCopy: <T = any>(obj: T) => T = (obj) => {
  const cache = new WeakMap()

  const _deepCopy = (val: any): any => {
    if (val === null || typeof val !== 'object') {
      return val
    }

    if (cache.has(val)) {
      return cache.get(val)
    }

    let copy: any

    if (val instanceof Date) {
      copy = new Date(val.getTime())
    } else if (val instanceof RegExp) {
      copy = new RegExp(val.source, val.flags)
    } else if (Array.isArray(val)) {
      copy = new Array(val.length)
      cache.set(val, copy)
      for (let i = 0; i < val.length; i++) {
        copy[i] = _deepCopy(val[i])
      }
    } else {
      copy = {}
      cache.set(val, copy)
      for (const key in val) {
        if (Object.prototype.hasOwnProperty.call(val, key)) {
          copy[key] = _deepCopy(val[key])
        }
      }
    }

    cache.set(val, copy)
    return copy
  }

  return _deepCopy(obj)
}

export const firstOfArray: <T>(targetArray: Array<T>) => T | null = (
  targetArray
) => {
  if (targetArray.length === 0) {
    return null
  }
  return deepCopy(targetArray[0])
}

export const lastOfArray: <T>(targetArray: Array<T>) => T | null = (
  targetArray
) => {
  if (targetArray.length === 0) {
    return null
  }
  return deepCopy(targetArray[targetArray.length - 1])
}

export const filledArray: <T>(length: number, value: T) => T[] = (
  length,
  value
) => new Array(length).fill(value)

export const sumArray: (arr1: number[], arr2: number[]) => number[] = (
  arr1,
  arr2
) => {
  const base: number[] = arr1.length >= arr2.length ? arr1 : arr2
  const addition: number[] = arr1.length >= arr2.length ? arr2 : arr1

  return base.map((v, index) => {
    const add: number = addition[index] || 0
    return v + add
  })
}

export const sum = (numbers: number[]): number => {
  return numbers.reduce((prev, current) => prev + current, 0)
}
