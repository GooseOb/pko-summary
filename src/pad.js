export const left = (str, length) =>
  str.length < length ? " ".repeat(length - str.length) + str : str;
export const right = (str, length) =>
  str.length < length ? str + " ".repeat(length - str.length) : str;

export const LENGTH = 16;

export const month = (str) => right(str, LENGTH / 2);
export const amount = (floatNum) => left(floatNum.toFixed(2), LENGTH);
export const column = (floatNum) => left(floatNum, LENGTH);
