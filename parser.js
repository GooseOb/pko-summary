const removeSpaces = (str) => str.replace(/\s/g, "");

const datePattern = /^\d{2}\.\d{2}\.20\d{2}/;

const states = [
  {
    // date of write-off
    pattern: datePattern,
  },
  {
    // transaction id
    callback: (item, ctx) => {
      if (ctx.transactionIds.has(item)) {
        ctx.doAdd = false;
      } else {
        ctx.transactionIds.add(item);
      }
    },
  },
  {
    // amount
    pattern: /^-?[\d ]+,\d{2}/,
    callback: (item, { currentItem }) => {
      currentItem.amount = removeSpaces(item);
    },
  },
  {
    // date of transaction
    pattern: datePattern,
    callback: (item, { currentItem }) => {
      currentItem.date = item;
    },
  },
];

const getEater = (ctx) => {
  let i = 0;
  return (token) => {
    const { pattern, callback } = states[i];
    if (!pattern || pattern.test(token)) {
      callback?.(token, ctx);
      ++i;
      if (i === states.length) {
        if (ctx.doAdd) {
          ctx.result.push(ctx.currentItem);
          ctx.currentItem = currentItem();
        } else {
          ctx.doAdd = true;
        }
        i = 0;
      }
    }
  };
};

const currentItem = () => ({
  date: "",
  amount: "",
});

export const parseDate2Amount = (tokens) => {
  const ctx = {
    result: [],
    currentItem: currentItem(),
    doAdd: true,
    transactionIds: new Set(),
  };

  const eat = getEater(ctx);

  for (const token of tokens) {
    eat(token);
  }

  return ctx.result;
};
