export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

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
