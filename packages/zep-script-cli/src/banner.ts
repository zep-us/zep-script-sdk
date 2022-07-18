import chalk from "chalk";
import figlet from "figlet";

const zepChalk = chalk.hex("#6758ff");

export default zepChalk(
  figlet.textSync("ZEP Script", { horizontalLayout: "full" })
);
