import publish from "./publish";

export default {
  func: publish,
  name: "publish",
  description: "Publish app.",
  options: [
    {
      name: "--projectRoot <string>",
      description: "Sets root dir of project to be archived.",
    },
    {
      name: "--config <string>",
      description: "Sets path to zep-script.json config file.",
    },
  ],
};
