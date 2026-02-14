import { deepCopy } from './utils'

describe('deepCopy', () => {
  it('should copy a simple object', () => {
    const obj = { a: 1, b: 'string', c: true }
    const copy = deepCopy(obj)
    expect(copy).toEqual(obj)
    expect(copy).not.toBe(obj)
  })

  it('should copy a nested object', () => {
    const obj = { a: { b: 1 } }
    const copy = deepCopy(obj)
    expect(copy).toEqual(obj)
    expect(copy.a).not.toBe(obj.a)
  })

  it('should copy an array', () => {
    const arr = [1, 2, 3]
    const copy = deepCopy(arr)
    expect(copy).toEqual(arr)
    expect(copy).not.toBe(arr)
  })

  it('should copy a Date object', () => {
    const date = new Date()
    const copy = deepCopy(date)
    expect(copy).toEqual(date)
    expect(copy).not.toBe(date)
    expect(copy instanceof Date).toBe(true)
  })

  it('should copy a RegExp object', () => {
    const regex = /abc/g
    const copy = deepCopy(regex)
    expect(copy).toEqual(regex)
    expect(copy).not.toBe(regex)
    expect(copy instanceof RegExp).toBe(true)
  })

  it('should handle undefined values', () => {
    const obj = { a: undefined }
    const copy = deepCopy(obj)
    expect(copy).toHaveProperty('a')
    expect(copy.a).toBeUndefined()
  })

  it('should handle circular references', () => {
    const obj: any = { a: 1 }
    obj.self = obj
    const copy = deepCopy(obj)
    expect(copy.a).toBe(1)
    expect(copy.self).toBe(copy)
    expect(copy.self).not.toBe(obj)
  })
})
