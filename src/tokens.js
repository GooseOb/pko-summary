import { join } from "path";
import PDFParser from "pdf2json";

const parsePdf = (pdfPath) =>
  new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", reject);
    pdfParser.on("pdfParser_dataReady", resolve);
    pdfParser.loadPDF(pdfPath);
  });

export const tokensFrom = (sourceDir, files) =>
  Promise.all(
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
  ).then((arr) => arr.flat());
