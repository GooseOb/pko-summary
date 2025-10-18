const parseDate = ([dateStr]) => {
  const [month, year] = dateStr.split(".").map(Number);
  return { month, year };
};

const getSortWithParser = (parse) => (sort) => (arr) =>
  arr.sort((a, b) => sort(parse(a), parse(b)));

export const getSortByDate = getSortWithParser(parseDate);
