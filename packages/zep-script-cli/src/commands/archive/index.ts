import archive from "./archive";

export default {
  func: archive,
  name: "archive",
  description:
    "Archive ZEP Script project to be ready for uploading. Project must have been built first before executing this command.",
  options: [
    {
      name: "--projectRoot <string>",
      description: "Sets root dir of project to be archived.",
    },
  ],
};
