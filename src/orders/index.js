import { getSortByDate } from "./utils.js";

export const orders = {
  asc: getSortByDate((a, b) => a.year - b.year || a.month - b.month),
  desc: getSortByDate((a, b) => b.year - a.year || b.month - a.month),
};
