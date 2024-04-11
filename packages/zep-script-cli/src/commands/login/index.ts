import login from "./login";

export default {
  func: login,
  name: "login",
  description:
    "Login to ZEP Server so that CLI can publish app to user's account.",
  options: [
    {
      name: "--projectRoot <string>",
      description: "Sets root dir of project to be archived.",
    },
    {
      name: "--target <string>",
      description: "Set target to zep server auth URL",
    },
  ],
};
