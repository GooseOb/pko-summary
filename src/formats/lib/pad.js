export const month = (str) => str.padEnd(7, " ");
export const column = (str) => str.padStart(16, " ");
export const amount = (floatNum) => column(floatNum.toFixed(2));
