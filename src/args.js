export const getArgs = (argv) => {
  let sourceDir = "sources";
  let resultFilename = "summary.txt";

  const args = {
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

  return { sourceDir, resultFilename };
};
