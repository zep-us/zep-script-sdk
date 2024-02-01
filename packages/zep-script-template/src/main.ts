/**
 * Copyright (c) 2023 ZEP Co., LTD
 */

import {add} from "./utils/add";

ScriptApp.showCenterLabel("Hello World");
ScriptApp.showCenterLabel(`1 + 2 = ${add(1, 2)}`);

let zepLogo = ScriptApp.loadSpritesheet("zep_logo.png");

ScriptMap.putObject(0, 0, zepLogo, { overlap: true });

ScriptApp.onDestroy.Add(function () {
  ScriptMap.clearAllObjects();
});
