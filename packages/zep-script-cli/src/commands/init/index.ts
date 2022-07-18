import init from "./init";

export default {
  func: init,
  name: "init <projectName>",
  description:
    "Initialize a new ZEP Script project named <projectName> in a directory of the same name.",
  options: [
    {
      name: "--npm",
      description: "Forces using npm for initialization",
    },
    {
      name: "--directory <string>",
      description: "Uses a custom directory instead of `<projectName>`.",
    },
    {
      name: "--skip-install",
      description: "Skips dependencies installation step",
    },
  ],
};
