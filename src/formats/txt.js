import * as pad from "./lib/pad.js";

export const txt = (arr, notInvertExpenses) =>
  arr.reduce(
    (acc, [month, { expenses, income }]) =>
      acc +
      pad.month(month) +
      pad.amount(income + expenses) +
      pad.amount(notInvertExpenses ? expenses : -expenses) +
      pad.amount(income) +
      "\n",
    pad.month("Month") +
      pad.column("Total") +
      pad.column("Expenses") +
      pad.column("Income") +
      "\n",
  );
