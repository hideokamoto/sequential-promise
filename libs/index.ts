/**
 * Execute async function as sequential
 * @example
 * ```typescript
 * sequentialPromise<number, string>([1,2,3,4,5], async (i) => {
 *   const start = moment()
 *   console.log(`Number: ${i}`)
 *   console.log(`Start: ${start.toISOString()}`)
 *   await dummy()
 *   console.log(`End ${moment().toISOString()}`)
 *   console.log(`${moment().diff(start, 'seconds')} sec`)
 *   console.log(' ')
 *   return `${i} + 2 = ${i + 2}`
 * }).then(r => console.log(r))
 * Number: 1
 * Start: 2019-08-30T07:35:00.175Z
 * End 2019-08-30T07:35:01.182Z
 * 1 sec
 *
 * Number: 2
 * Start: 2019-08-30T07:35:01.184Z
 * End 2019-08-30T07:35:02.188Z
 * 1 sec
 *
 * Number: 3
 * Start: 2019-08-30T07:35:02.188Z
 * End 2019-08-30T07:35:03.194Z
 * 1 sec
 *
 * Number: 4
 * Start: 2019-08-30T07:35:03.194Z
 * End 2019-08-30T07:35:04.200Z
 * 1 sec
 *
 * Number: 5
 * Start: 2019-08-30T07:35:04.200Z
 * End 2019-08-30T07:35:05.206Z
 * 1 sec
 *
 * [ '1 + 2 = 3', '2 + 2 = 4', '3 + 2 = 5', '4 + 2 = 6', '5 + 2 = 7' ]
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sequentialPromise = async <T = any, R = any>(targets: T[], callback: (prop: T) => Promise<R>): Promise<R[]> => {
  const results: R[] = []
  let p: Promise<void> = Promise.resolve()
  targets.forEach((target): void => {
    p = p.then(async (): Promise<void> => {
      const result = await callback(target)
      results.push(result)
    })
  })
  await p
  return results
}

export default sequentialPromise