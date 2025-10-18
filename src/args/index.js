import path from "path";
import { formatters } from "../formats/index.js";
import { orders } from "../orders/index.js";
import { UnknownArgumentError } from "./errors.js";

export const getArgs = (argv) => {
  let inputDir = "sources";
  let outputFile = "";
  let order = orders.asc;
  let negateExpenses = false;

  const lookup = Object.fromEntries(
    [
      [
        ["--input", "-i"],
        {
          arg: true,
          fn: (v) => {
            inputDir = v;
          },
        },
      ],
      [
        ["--output", "-o"],
        {
          arg: true,
          fn: (v) => {
            outputFile = v;
          },
        },
      ],
      [
        ["--sort", "-s"],
        {
          arg: true,
          fn: (v) => {
            v = v.toLowerCase();
            order = orders[v];
            if (!order)
              throw new UnknownArgumentError("sort", v, Object.keys(orders));
          },
        },
      ],
      [
        ["--negate-expenses"],
        {
          arg: false,
          fn: () => {
            negateExpenses = true;
          },
        },
      ],
    ].flatMap(([keys, v]) => keys.map((k) => [k, v])),
  );

  for (let i = 2; i < argv.length; i++) {
    const def = lookup[argv[i]];
    if (!def) continue;

    const value = def.arg ? argv[++i] : undefined;
    def.fn(value);
  }

  if (!outputFile) outputFile = "summary.txt";

  const ext = path.extname(outputFile).slice(1);
  const format = formatters[ext] || formatters.txt;

  return {
    inputDir,
    outputFile,
    format,
    order,
    negateExpenses,
  };
};
