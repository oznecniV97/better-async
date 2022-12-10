# better-async

Useful package to work with promises.

## BetterPromise class

This class has 2 utility method:

- objectAll
- objectAllSettled

### BetterPromise.objectAll()

Same usage of `Promise.all` method ([MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)), but it accept a `Record<string, Promise<T>>` in input and return a `Record<string, T>`.

Usage example:

- case with standard `Promise.all`

```typescript
const responses = await Promise.all([
    externalApiRequest1(),
    externalApiRequest2(),
    timeConsumingProcess(),
]);

console.log(responses[0]); // result of external api request 1
console.log(responses[1]); // result of external api request 2
console.log(responses[2]); // result of time consuming process
```

- case with `BetterPromise.objectAll`

```typescript
const responses = await BetterPromise.objectAll({
    extApi1: externalApiRequest1(),
    extApi2: externalApiRequest2(),
    process: timeConsumingProcess(),
});

//as you can see, the code is more clear in this way. You don't need to remember which thing are in which position
console.log(responses.extApi1); // result of external api request 1
console.log(responses.extApi2); // result of external api request 2
console.log(responses.process); // result of time consuming process
```

### BetterPromise.objectAllSettled()

Same usage of `Promise.allSettled` method ([MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)), but it accept a `Record<string, Promise<T>>` in input and return a `Record<string, PromiseSettledResult<T>>`.

Usage example:

- case with standard `Promise.allSettled`

```typescript
const responses = await Promise.allSettled([
    externalApiRequest1(),
    externalApiRequest2(),
    timeConsumingProcess(),
]);

console.log(responses[0].status); // status of external api request 1
console.log(responses[1].status); // status of external api request 2
console.log(responses[2].status); // status of time consuming process
```

- case with `BetterPromise.objectAllSettled`

```typescript
const responses = await BetterPromise.objectAllSettled({
    extApi1: externalApiRequest1(),
    extApi2: externalApiRequest2(),
    process: timeConsumingProcess(),
});

//as you can see, the code is more clear in this way. You don't need to remember which thing are in which position
console.log(responses.extApi1.status); // status of external api request 1
console.log(responses.extApi2.status); // status of external api request 2
console.log(responses.process.status); // status of time consuming process
```

## Roadmap

- ✔ parallel promises on map
- easy promise with auto try catch and return instead of callback TODO: CHECK IF JS ALREADY DO THIS

```typescript
//standard version
new Promise((resolve, reject) => {
    try {
        const valueToReturn = canRaiseException();
        resolve(valueToReturn);
    } catch(err) {
        reject(err);
    }
});

//EasyPromise, try catch is automatic
new EasyPromise(async () => {
    const valueToReturn = canRaiseException();
    return valueToReturn;
});
```
