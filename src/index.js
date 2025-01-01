import { writeFile, readdir } from "fs/promises";
import { getArgs } from "./args.js";
import { tokensFrom } from "./tokens.js";
import { parseDate2Amount } from "./parser.js";
import * as pad from "./pad.js";

const { sourceDir, resultFilename } = getArgs(process.argv);

const date2amount = parseDate2Amount(
  await tokensFrom(sourceDir, await readdir(sourceDir)),
);

process.stdout.write(`Parsed ${date2amount.length} entries\n`);

const result = Object.entries(
  date2amount.reduce((acc, { date, amount }) => {
    const [, month, year] = date.split(".");
    const key = `${month}.${year}`;
    acc[key] = acc[key] || { spending: 0, income: 0 };
    if (amount.startsWith("-")) {
      acc[key].spending += parseFloat(amount.replace(",", "."));
    } else {
      acc[key].income += parseFloat(amount.replace(",", "."));
    }
    return acc;
  }, {}),
)
  .sort(([a], [b]) => {
    const [aMonth, aYear] = a.split(".").map(Number);
    const [bMonth, bYear] = b.split(".").map(Number);
    return bYear - aYear || bMonth - aMonth;
  })
  .reduce(
    (acc, [month, { spending, income }]) =>
      acc +
      pad.month(month) +
      pad.amount(income + spending) +
      pad.amount(spending) +
      pad.amount(income) +
      "\n",
    pad.month("Month") +
      pad.column("Total") +
      pad.column("Expenses") +
      pad.column("Income") +
      "\n",
  );

await writeFile(resultFilename, result);
process.stdout.write(`Created report in ${resultFilename}\n`);
