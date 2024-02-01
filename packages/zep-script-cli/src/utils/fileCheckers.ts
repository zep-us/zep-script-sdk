import path from "path";
import fs from "fs-extra";

export function getScriptLanguage(root: string) {
  let scriptFilePath = path.join(root, "src/index.ts");
  if (fs.existsSync(scriptFilePath)) {
    return "typescript";
  }
  scriptFilePath = path.join(root, "src/index.js");
  if (fs.existsSync(scriptFilePath)) {
    return "javascript";
  }
  throw new Error("No script source file found. Tried to find index.ts or index.js in src folder.");
}

export function isScriptBuildExists(root: string) {
  let scriptDistFilePath = path.join(root, "dist/main.js");
  return fs.existsSync(scriptDistFilePath)
}

export function isWidgetDirExists(root: string) {
  let widgetDirPath = path.join(root, "widget");
  return fs.existsSync(widgetDirPath);
}

export function isWidgetBuildExists(root: string) {
  let widgetDistFilePath = path.join(root, "widget/dist/index.html");
  return fs.existsSync(widgetDistFilePath)
}
