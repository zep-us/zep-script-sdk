import build from "./build";

export default {
  func: build,
  name: "build",
  description: "Build project to be ready for archived.",
  options: [
    {
      name: "--projectRoot <string>",
      description: "Sets root dir of project to be built.",
    },
    {
      name: "--outputPath <string>",
      description: "Sets output path of the archive.",
    },
    {
      name: "--config <string>",
      description: "Sets path to zep-script.json config file.",
    },
    {
      name: "--legacy <boolean>",
      description: "Set mode to build Zep-script legacy app(.js)"
    }
  ],
};
