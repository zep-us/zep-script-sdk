import pack from "./pack";

export default {
  func: pack,
  name: "pack",
  description: "Build project to be ready for archived.",
  options: [
    {
      name: "--projectRoot <string>",
      description: "Sets root dir of project to be built.",
    },
  ],
};
