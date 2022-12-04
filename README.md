# better-async

Useful package to work with promises

## TODO

- parallel promises on map
- easy promise with auto try catch and return instead of callback TODO: CHECK IF JS ALREADY DO THIS
- change package configurations: [info standard configuration](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)

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
