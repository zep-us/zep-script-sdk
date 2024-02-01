/**
 * Copyright (c) 2023 ZEP Co., LTD
 */

import {add} from "./utils/add";

ScriptApp.showCenterLabel("Hello World");
ScriptApp.showCenterLabel(`1 + 2 = ${add(1, 2)}`);

ScriptApp.showWidget("widget/index.html", "topleft", 800, 800);

ScriptApp.onDestroy.Add(function () {
  ScriptMap.clearAllObjects();
});
