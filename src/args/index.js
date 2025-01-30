import { formatters } from "../formats/index.js";
import { orders } from "../orders/index.js";
import { UnknownArgumentError } from "./errors.js";

export const getArgs = (argv) => {
  let sourceDir = "sources";
  let resultFilename = "";
  let ext = "txt";
  let format = formatters[ext];
  let order = orders.asc;
  let negativeExpenses = false;

  const args = {
    "--negative-expenses": () => {
      negativeExpenses = true;
    },
    "--order": (value) => {
      value = value.toLowerCase();
      order = orders[value];
      if (!order) {
        throw new UnknownArgumentError("order", value, Object.keys(orders));
      }
    },
    "--format": (value) => {
      ext = value.toLowerCase();
      format = formatters[ext];
      if (!format) {
        throw new UnknownArgumentError(
          "format",
          value,
          Object.keys(formatters),
        );
      }
    },
    "--dir": (value) => {
      sourceDir = value;
    },
    "--result": (value) => {
      resultFilename = value;
    },
  };

  for (let i = 2; i < argv.length; i++) {
    args[argv[i]]?.(argv[++i]);
  }

  if (!resultFilename) {
    resultFilename = `summary.${ext}`;
  }

  return {
    sourceDir,
    resultFilename,
    format,
    order,
    negativeExpenses,
  };
};
