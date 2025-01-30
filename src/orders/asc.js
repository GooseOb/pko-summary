export const asc = (arr) =>
  arr.sort(([a], [b]) => {
    const [aMonth, aYear] = a.split(".").map(Number);
    const [bMonth, bYear] = b.split(".").map(Number);
    return aYear - bYear || aMonth - bMonth;
  });
