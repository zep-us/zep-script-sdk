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
  ],
};
