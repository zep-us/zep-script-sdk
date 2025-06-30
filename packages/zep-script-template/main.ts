/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

import { add } from "./src/add";

const zepLogo = ScriptApp.loadSpritesheet("zep_logo.png");

ScriptApp.onJoinPlayer.Add(function (player) {
  ScriptApp.showCenterLabel(`Hello World ${add(1, 6)}`);
});

ScriptApp.onStart.Add(function () {
  ScriptMap.putObject(0, 0, zepLogo, { overlap: true });
});

ScriptApp.onDestroy.Add(function () {
  ScriptMap.clearAllObjects();
});
