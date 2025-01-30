export class UnknownArgumentError extends Error {
  constructor(name, arg, availableArgs) {
    super(
      `\x1b[31m[Unknown Argument]\x1b[0m ${name}: \x1b[31m${arg}\x1b[0m\n\x1b[34mAvailable values\x1b[0m: \x1b[32m${availableArgs.join("\x1b[0m, \x1b[32m")}\x1b[0m`,
    );
  }
}
