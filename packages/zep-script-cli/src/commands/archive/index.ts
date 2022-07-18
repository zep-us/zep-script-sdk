import archive from "./archive";

export default {
  func: archive,
  name: "archive",
  description: "Archive project.",
  options: [
    {
      name: "--projectRoot <string>",
      description: "Sets root dir of project.",
    },
  ],
};
