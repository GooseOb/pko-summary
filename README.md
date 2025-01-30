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
npm start
# or
bun start
```

# Options

| name                  | default     | value      | description                   |
| --------------------- | ----------- | ---------- | ----------------------------- |
| `--dir`               | sources     | string     | Directory of wyciąg pdf files |
| `--result`            | summary.txt | string     | Result file name              |
| `--negative-expenses` |             |            | Expenses as negative numbers  |
| `--order`             | asc         | asc / desc | Sort order by date            |
| `--format`            | txt         | txt / csv  | Format of result file         |
