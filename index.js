import { writeFile, readdir } from "fs/promises";
import { join, resolve } from "path";
import PDFParser from "pdf2json";
import { parseDate2Amount } from "./parser.js";

const parsePdf = (pdfPath) =>
  new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", reject);
    pdfParser.on("pdfParser_dataReady", resolve);
    pdfParser.loadPDF(pdfPath);
  });

const padLeft = (str, length) =>
  str.length < length ? " ".repeat(length - str.length) + str : str;
const padRight = (str, length) =>
  str.length < length ? str + " ".repeat(length - str.length) : str;

const LENGTH = 16;
const padAmount = (floatNum) => padLeft(floatNum.toFixed(2), LENGTH);

let sourceDir = resolve("sources");
let resultFilename = "summary.txt";
const args = {
  "--dir": (value) => {
    sourceDir = value;
  },
  "--result": (value) => {
    resultFilename = value;
  },
};
for (let i = 2; i < process.argv.length; i++) {
  args[process.argv[i]]?.(process.argv[++i]);
}

const files = await readdir(sourceDir);

const tokens = (
  await Promise.all(
    files.map(async (file) => {
      process.stdout.write(`[${file}] Tokenizing...\n`);
      const result = [];
      for (const { Texts } of (await parsePdf(join(sourceDir, file))).Pages) {
        for (const line of Texts) {
          const data = line?.R?.[0]?.T;
          if (data) {
            if (result.length !== 0 || data === "Opis%20operacji") {
              result.push(decodeURIComponent(data));
            }
          }
        }
      }
      process.stdout.write(`[${file}] Tokenized\n`);
      return result;
    }),
  )
).flat();

const date2amount = parseDate2Amount(tokens);

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
      padRight(month, 8) +
      padAmount(income + spending) +
      padAmount(spending) +
      padAmount(income) +
      "\n",
    padRight("Month", 8) +
      padLeft("Total", LENGTH) +
      padLeft("Expenses", LENGTH) +
      padLeft("Income", LENGTH) +
      "\n",
  );

await writeFile(resultFilename, result);
process.stdout.write(`Created report in ${resultFilename}\n`);
