export const deepCopy: <T = any>(obj: T) => T = (obj) =>
  JSON.parse(JSON.stringify(obj))

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
