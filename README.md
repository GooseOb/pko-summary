# PKO Summary by Month

Tool for generating a single summary of PKO bank transactions by month
from wyciąg pdf files.

Needs Node.js to run.

Install dependencies:

```sh
npm install
# or, if you have bun
bun install
```

Run:

```sh
npm run [script]
# or
bun [script]
```

# Scripts

| script | description                       |
| ------ | --------------------------------- |
| `txt`  | Generate summary in `summary.txt` |
| `csv`  | Generate summary in `summary.csv` |

# Options

| name                | default     | value      | description                   |
| ------------------- | ----------- | ---------- | ----------------------------- |
| `--input` / `-i`    | sources     | string     | Directory of wyciąg pdf files |
| `--output` / `-o`   | summary.txt | string     | Result file name              |
| `--sort` / `-s`     | asc         | asc / desc | Sort order by date            |
| `--negate-expenses` |             |            | Expenses as negative numbers  |
