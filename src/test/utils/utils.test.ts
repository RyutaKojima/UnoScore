import {
  deepCopy,
  firstOfArray,
  lastOfArray,
  filledArray,
  sumArray,
  sum,
} from '../../utils/utils'

describe('utils', () => {
  describe('deepCopy', () => {
    it('creates a deep copy of primitives', () => {
      expect(deepCopy(123)).toBe(123)
      expect(deepCopy('hello')).toBe('hello')
      expect(deepCopy(true)).toBe(true)
      expect(deepCopy(null)).toBeNull()
    })

    it('creates a deep copy of an object and prevents reference mutation', () => {
      const original = { a: 1, b: { c: 2 } }
      const copied = deepCopy(original)

      expect(copied).toEqual(original)
      expect(copied).not.toBe(original)
      expect(copied.b).not.toBe(original.b)

      copied.b.c = 99
      expect(original.b.c).toBe(2)
    })

    it('creates a deep copy of an array', () => {
      const original = [[1, 2], [3, 4]]
      const copied = deepCopy(original)

      expect(copied).toEqual(original)
      expect(copied).not.toBe(original)
      expect(copied[0]).not.toBe(original[0])

      copied[0][0] = 999
      expect(original[0][0]).toBe(1)
    })
  })

  describe('firstOfArray', () => {
    it('returns a deep copy of the first element', () => {
      const array = [{ name: 'Alice' }, { name: 'Bob' }]
      const first = firstOfArray(array)

      expect(first).toEqual({ name: 'Alice' })
      expect(first).not.toBe(array[0])

      if (first) {
        first.name = 'Charlie'
      }
      expect(array[0].name).toBe('Alice')
    })

    it('returns null for an empty array', () => {
      expect(firstOfArray([])).toBeNull()
    })
  })

  describe('lastOfArray', () => {
    it('returns a deep copy of the last element', () => {
      const array = [{ name: 'Alice' }, { name: 'Bob' }]
      const last = lastOfArray(array)

      expect(last).toEqual({ name: 'Bob' })
      expect(last).not.toBe(array[1])

      if (last) {
        last.name = 'Charlie'
      }
      expect(array[1].name).toBe('Bob')
    })

    it('returns null for an empty array', () => {
      expect(lastOfArray([])).toBeNull()
    })
  })

  describe('filledArray', () => {
    it('creates an array of given length filled with specified value', () => {
      expect(filledArray(3, 0)).toEqual([0, 0, 0])
      expect(filledArray(2, 'x')).toEqual(['x', 'x'])
      expect(filledArray(0, 5)).toEqual([])
    })
  })

  describe('sumArray', () => {
    it('sums two equal length numeric arrays element-wise', () => {
      expect(sumArray([1, 2, 3], [4, 5, 6])).toEqual([5, 7, 9])
    })

    it('handles arr1 being longer than arr2', () => {
      expect(sumArray([10, 20, 30, 40], [1, 2])).toEqual([11, 22, 30, 40])
    })

    it('handles arr2 being longer than arr1', () => {
      expect(sumArray([1, 2], [10, 20, 30, 40])).toEqual([11, 22, 30, 40])
    })

    it('returns empty array when both inputs are empty', () => {
      expect(sumArray([], [])).toEqual([])
    })
  })

  describe('sum', () => {
    it('calculates the sum of an array of numbers', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15)
      expect(sum([-5, 5, -10, 10])).toBe(0)
      expect(sum([1.5, 2.5])).toBe(4)
    })

    it('returns 0 for an empty array', () => {
      expect(sum([])).toBe(0)
    })
  })
})
