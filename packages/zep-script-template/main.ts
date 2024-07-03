/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

import { add } from "./src/add";

ScriptApp.showCenterLabel(`Hello World ${add(1, 1)}`);

let zepLogo = ScriptApp.loadSpritesheet("zep_logo.png");

ScriptMap.putObject(0, 0, zepLogo, { overlap: true });

ScriptApp.onDestroy.Add(function () {
  ScriptMap.clearAllObjects();
});
