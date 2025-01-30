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

| name                  | default     | description                         | value      |
| --------------------- | ----------- | ----------------------------------- | ---------- |
| `--dir`               | sources     | Directory of wyciąg pdf files       | string     |
| `--result`            | summary.txt | Result file name                    | string     |
| `--negative-expenses` |             | Format expenses as negative numbers | NONE       |
| `--order`             | asc         | Sort order by date                  | asc / desc |
| `--format`            | txt         | Format of result file               | txt / csv  |
