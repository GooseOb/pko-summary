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

| name       | default     | description                   |
| ---------- | ----------- | ----------------------------- |
| `--dir`    | sources     | Directory of wyciąg pdf files |
| `--result` | summary.txt | Result file name              |
