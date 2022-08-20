import archive from "./archive";
import build from "./build";
import publish from "./publish";
import init from "./init";

export type OptionValue = string | boolean | number;

export type CommandFunction<Args = Object> = (
  argv: string[],
  args: Args
) => Promise<void> | void;

export type CommandOption = {
  name: string;
  description?: string;
  parse?: (val: string) => any;
  default?: OptionValue | (() => OptionValue);
};

export type Command = {
  name: string;
  description?: string;
  options?: Array<CommandOption>;
  func: CommandFunction<Object>;
};

export const commands = [init, build, publish, archive] as Command[];
