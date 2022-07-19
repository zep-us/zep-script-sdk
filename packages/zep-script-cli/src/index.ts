import chalk from "chalk";
import { program } from "commander";
import { Command, commands } from "./commands";
import logger from "./tools/logger";

const handleError = (err: Error) => {
  logger.enable();
  const verbose = program.opts().verbose;
  if (verbose) {
    logger.error(err.message);
  } else {
    // Some error messages (esp. custom ones) might have `.` at the end already.
    const message = err.message.replace(/\.$/, "");
    logger.error(`${message}.`);
  }
  if (err.stack) {
    logger.log(err.stack);
  }
  if (!verbose) {
    logger.info(
      chalk.dim(
        `Run CLI with ${chalk.reset("--verbose")} ${chalk.dim(
          "flag for more details."
        )}`
      )
    );
  }
  process.exit(1);
};

function attachCommand(command: Command): void {
  const cmd = program
    .command(command.name)
    .action(async function handleAction(
      this: typeof program,
      ...args: string[]
    ) {
      const passedOptions = this.opts();
      const argv = Array.from(args).slice(0, -1);

      try {
        await command.func(argv, passedOptions);
      } catch (error) {
        if (error instanceof Error) {
          handleError(error);
        }
      }
    });

  if (command.description) {
    cmd.description(command.description);
  }

  for (const opt of command.options || []) {
    cmd.option(
      opt.name,
      opt.description ?? "",
      opt.parse || ((val: any) => val),
      opt.default
    );
  }
}

async function setupAndRun() {
  program.option("-v, --verbose", "Log all outputs");

  for (const command of commands) {
    attachCommand(command);
  }

  program.parse();
}

export async function run() {
  try {
    await setupAndRun();
  } catch (e) {
    if (e instanceof Error) {
      handleError(e);
    }
  }
}
