import {
  sequentialPromise
} from '../libs/index'

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