/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/add.ts
function add(a, b) {
  return a + b;
}
;// ./main.ts

const zepLogo = App.loadSpritesheet("zep_logo.png");
App.onJoinPlayer.Add(function (player) {
  App.showCenterLabel(`Hello World ${add(1, 6)}`);
});
App.onStart.Add(function () {
  Map.putObject(0, 0, zepLogo, {
    overlap: true
  });
});
App.onDestroy.Add(function () {
  Map.clearAllObjects();
});
/******/ })()
;