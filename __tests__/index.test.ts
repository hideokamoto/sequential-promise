import {
  arrayChunk,
  sequentialPromise,
  sequentialPromiseWithChunk
} from '../libs/index'

const createArrayByLength = (length: number): Array<number> => {
  return [...Array(length)].fill(0).map((x,i) => x+i)
}

describe('sequentialPromise()', () => {
  it('should return valid resolved list', async () => {
    const result = await sequentialPromise<number, number>([1,2,3], async (number) => number + 1)
    expect(result).toEqual([2,3,4])
  })
  it('should return valid resolved lists object', async () => {
    const CONSTANT = 10
    const result = await sequentialPromise<number, {id: number, message: string}>([1,2,3], async (number) => {
      return {
        id: number,
        message: `${number + CONSTANT} is ${number} + ${CONSTANT}`
      }
    })
    expect(result).toEqual([{
      id: 1,
      message: "11 is 1 + 10"
    }, {
      id: 2,
      message: "12 is 2 + 10"
    }, {
      id: 3,
      message: "13 is 3 + 10"
    }])
  })
})

describe('sequentialPromiseWithChunk', () => {
  it('should return the result as chunked', async() => {
    const result = await sequentialPromiseWithChunk<number, number>([1,2,3], async (number) => number + 1, {
      chunkSize: 2
    })
    expect(result).toEqual([
      [2,3],
      [4]
    ])
  })
  it.each([
    [5, 3, 2],
    [5, 5, 1],
    [10, 9, 2],
    [10, 11, 1],
  ])('given %i items and the chunk size is %p, should the array be %p', async(length, chunkSize, expectedArrayLength) => {
    const list = createArrayByLength(length)
    const result = await sequentialPromiseWithChunk<number, number>(list, async (number) => number + 1, {
      chunkSize
    })
    expect(result.length).toEqual(expectedArrayLength)
  })
})

describe('arrayChunk', () => {
  it.each([
    [5, 3, 2],
    [5, 5, 1],
    [10, 9, 2],
    [10, 11, 1],
  ])('given %i items and the chunk size is %p, should the array be %p', (length, chunkSize, expectedArrayLength) => {
    const list = createArrayByLength(length)
    const chunkedArray = arrayChunk(list, chunkSize)
    expect(chunkedArray.length).toEqual(expectedArrayLength)
  })
})