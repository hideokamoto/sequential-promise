# Sequential Promise
Simply async task runnner as sequential

## Async style

```typescript
import as moment from 'moment'

const dummy = async () => {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

const asyncFunc = async () => {

  const arr = [1,2,3,4,5]
  const result = await Promise.all(arr.map(async i => {
    const start = moment()
    console.log(`Number: ${i}`)
    console.log(`Start: ${start.toISOString()}`)
    await dummy()
    console.log(`End ${moment().toISOString()}`)
    console.log(`${moment().diff(start, 'seconds')} sec`)
    console.log(' ')
    return i + 1
  }))
  return result
})

asyncFunc().then(result => console.log(result))
```

The function will run async.

```bash
Number: 1
Start: 2019-08-30T07:52:43.862Z
Number: 2
Start: 2019-08-30T07:52:43.862Z
Number: 3
Start: 2019-08-30T07:52:43.863Z
Number: 4
Start: 2019-08-30T07:52:43.863Z
Number: 5
Start: 2019-08-30T07:52:43.863Z
End 2019-08-30T07:52:44.866Z
1 sec
 
End 2019-08-30T07:52:44.866Z
1 sec
 
End 2019-08-30T07:52:44.867Z
1 sec
 
End 2019-08-30T07:52:44.867Z
1 sec
 
End 2019-08-30T07:52:44.867Z
1 sec
 
[ 2, 3, 4, 5, 6 ]
```

## Use the package
To use the package, we can run sequential

```typescript
import sequentialPromise from 'sequential-promise'

sequentialPromise<number, string>([1,2,3,4,5], async (i) => {
  const start = moment()
  console.log(`Number: ${i}`)
  console.log(`Start: ${start.toISOString()}`)
  await dummy()
  console.log(`End ${moment().toISOString()}`)
  console.log(`${moment().diff(start, 'seconds')} sec`)
  console.log(' ')
  return `${i} + 2 = ${i + 2}`
}).then(r => console.log(r))
```

This is the result.

```bash
 Number: 1
 Start: 2019-08-30T07:35:00.175Z
 End 2019-08-30T07:35:01.182Z
 1 sec

 Number: 2
 Start: 2019-08-30T07:35:01.184Z
 End 2019-08-30T07:35:02.188Z
 1 sec

 Number: 3
 Start: 2019-08-30T07:35:02.188Z
 End 2019-08-30T07:35:03.194Z
 1 sec

 Number: 4
 Start: 2019-08-30T07:35:03.194Z
 End 2019-08-30T07:35:04.200Z
 1 sec

 Number: 5
 Start: 2019-08-30T07:35:04.200Z
 End 2019-08-30T07:35:05.206Z
 1 sec

 [ '1 + 2 = 3', '2 + 2 = 4', '3 + 2 = 5', '4 + 2 = 6', '5 + 2 = 7' ]
```

## contribution

```bash
// clone
$ git clone git@github.com:hideokamoto/sequential-promise.git
$ cd sequential-promise

// setup
$ yarn

// Unit test
$ yarn test
or
$ yarn run test:watch

// Lint
$ yarn run lint
or
$ yarn run lint --fix

// Build
$ yarn run build

// Rebuild docs
$ yarn run doc
```