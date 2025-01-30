const SEP = ";";

export const csv = (arr, notInvertExpenses) =>
  arr.reduce(
    (acc, [month, { expenses, income }]) =>
      acc +
      month +
      SEP +
      (income + expenses).toFixed(2) +
      SEP +
      (notInvertExpenses ? expenses : -expenses).toFixed(2) +
      SEP +
      income.toFixed(2) +
      "\n",
    `sep=${SEP}\nMonth;Total;Expenses;Income\n`,
  );
