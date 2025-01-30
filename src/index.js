import { writeFile } from "fs/promises";
import { getArgs } from "./args/index.js";
import { extractLinesFromFiles } from "./tokens.js";
import { parseDate2Amount } from "./parser.js";

try {
  var { sourceDir, resultFilename, format, order, negativeExpenses } = getArgs(
    process.argv,
  );
} catch (e) {
  process.stderr.write(e.message + "\n");
  process.exit(1);
}

const date2amount = parseDate2Amount(await extractLinesFromFiles(sourceDir));

process.stdout.write(`Parsed ${date2amount.length} entries\n`);

const result = format(
  order(
    Object.entries(
      date2amount.reduce((acc, { date, amount }) => {
        const [, month, year] = date.split(".");
        const key = `${month}.${year}`;
        acc[key] = acc[key] || { expenses: 0, income: 0 };
        if (amount.startsWith("-")) {
          acc[key].expenses += parseFloat(amount.replace(",", "."));
        } else {
          acc[key].income += parseFloat(amount.replace(",", "."));
        }
        return acc;
      }, {}),
    ),
  ),
  negativeExpenses,
);
await writeFile(resultFilename, result);
process.stdout.write(`Created report in ${resultFilename}\n`);
