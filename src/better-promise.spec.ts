import { BetterPromise } from "./better-promise";

describe("BetterPromise", () => {
  describe("objectAll", () => {
    test("promiseOkCase", async () => {
      const numberValue = 2;
      const stringValue = "hello";
      const stringValueNoPromise = "no promise string";
      const test = {
        "foo": Promise.resolve(numberValue),
        "bar": Promise.resolve(stringValue),
        "noPromise": stringValueNoPromise,
      };
      const expected = {
        "foo": numberValue,
        "bar": stringValue,
        "noPromise": stringValueNoPromise,
      };

      const res = await BetterPromise.objectAll(test);

      expect(res).toStrictEqual(expected);
    });

    test("promiseKoCase", async () => {
      const expectedError = new Error("error in promise");
      const test = {
        "foo": Promise.resolve(2),
        "bar": Promise.reject(expectedError),
      };

      await expect(BetterPromise.objectAll(test)).rejects.toThrow(expectedError);
    });
  });

  describe("objectAllSettled", () => {
    test("promiseOkCase", async () => {
      const numberValue = 2;
      const stringValue = "hello";
      const test = {
        "foo": Promise.resolve(numberValue),
        "bar": Promise.resolve(stringValue),
      };
      const expected = {
        "foo": {
          status: "fulfilled",
          value: numberValue,
        },
        "bar": {
          status: "fulfilled",
          value: stringValue,
        },
      };

      const res = await BetterPromise.objectAllSettled(test);

      expect(res).toStrictEqual(expected);
    });

    test("promiseKoCase", async () => {
      const numberValue = 2;
      const expectedError = new Error("error in promise");
      const test = {
        "foo": Promise.resolve(numberValue),
        "bar": Promise.reject(expectedError),
      };
      const expected = {
        "foo": {
          status: "fulfilled",
          value: numberValue,
        },
        "bar": {
          status: "rejected",
          reason: expectedError,
        },
      };

      const res = await BetterPromise.objectAllSettled(test);

      expect(res).toStrictEqual(expected);
    });
  });
});