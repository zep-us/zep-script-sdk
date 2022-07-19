/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

// load sprite
let redman = ScriptApp.loadSpritesheet(
  "redman.png",
  48,
  64,
  {
    left: [5, 6, 7, 8, 9], // defined base anim
    up: [15, 16, 17, 18, 19], // defined base anim
    down: [0, 1, 2, 3, 4], // defined base anim
    right: [10, 11, 12, 13, 14], // defined base anim
  },
  8
);

// load sprite
let blueman = ScriptApp.loadSpritesheet(
  "blueman.png",
  48,
  64,
  {
    left: [5, 6, 7, 8, 9],
    up: [15, 16, 17, 18, 19],
    down: [0, 1, 2, 3, 4],
    right: [10, 11, 12, 13, 14],
  },
  8
);

const STATE_INIT = 3000;
const STATE_READY = 3001;
const STATE_PLAYING = 3002;
const STATE_JUDGE = 3004;
const STATE_END = 3005;

// load sprite
let red = ScriptApp.loadSpritesheet("red.png");
let blue = ScriptApp.loadSpritesheet("blue.png");
let tomb = ScriptApp.loadSpritesheet("tomb.png");

let _start = false;
let _gameEnd = false;
let _state = STATE_INIT;
let _stateTimer = 0;
let _timer = 90;

let _objects = {};

let _redScore = 0;
let _blueScore = 0;

// for using hash key
let HEIGHT_KEY = 10000000;

let _blueTeam = [];
let _redTeam = [];

let _players = ScriptApp.players; // ScriptApp.players : get total players
let TEAM_COUNTER = 0;
let _resultStr = "";

function startState(state) {
  _state = state;
  _stateTimer = 0;

  switch (_state) {
    case STATE_INIT:
      _start = true;
      _stateTimer = 0;
      _timer = 90;

      _redScore = 0;
      _blueScore = 0;
      _objects = {};

      for (let i in _players) {
        let p = _players[i];
        // create and utilize option data using tags.
        p.tag = {
          x: p.tileX,
          y: p.tileY,
          sturn: false,
          sTime: 1,
          super: false,
          team: Math.floor(TEAM_COUNTER % 2),
        };

        TEAM_COUNTER++;

        if (p.tag.team == 0) _redTeam.push(p);
        else if (p.tag.team == 1) _blueTeam.push(p);

        p.sprite = p.tag.team == 0 ? redman : blueman;
        p.sendUpdated();
      }
      break;
    case STATE_READY:
      for (let i in _players) {
        let p = _players[i];
        p.moveSpeed = 0;
        p.sendUpdated();
      }
      break;
    case STATE_PLAYING:
      for (let i in _players) {
        let p = _players[i];
        p.moveSpeed = 80;
        p.sendUpdated();
      }
      break;
    case STATE_JUDGE:
      for (let i in _players) {
        let p = _players[i];
        p.moveSpeed = 0;
        p.sendUpdated();
      }
      break;
    case STATE_END:
      _start = false;

      for (let i in _players) {
        let p = _players[i];
        p.moveSpeed = 80;
        p.title = null;
        p.sprite = null;
        p.sendUpdated();
      }

      // remove all objects created by the zep-scripts
      // 젭스크립트로 생성된 모든 오브젝트를 제거
      ScriptMap.clearAllObjects();
      break;
  }
}

ScriptApp.onStart.Add(function () {
  startState(STATE_INIT);
});

// when player join the space event
// 플레이어가 스페이스에 입장 했을 때 이벤트
ScriptApp.onJoinPlayer.Add(function (p) {
  p.tag = {
    x: p.tileX,
    y: p.tileY,
    sturn: false,
    sTime: 1,
    super: false,
    team: Math.floor(TEAM_COUNTER % 2),
  };

  if (p.tag.team == 0) _redTeam.push(p);
  else if (p.tag.team == 1) _blueTeam.push(p);

  TEAM_COUNTER++;
  p.nameColor = p.tag.team == 0 ? 16711680 : 255;
  p.sprite = p.tag.team == 0 ? redman : blueman;
  p.sendUpdated();

  _players = ScriptApp.players;
});

// when player leave the space event
// 플레이어가 스페이스를 나갔을 때 이벤트
ScriptApp.onLeavePlayer.Add(function (p) {
  p.moveSpeed = 80;
  p.title = null;
  p.sprite = null;
  p.sendUpdated();

  _players = ScriptApp.players; // update all plyers for update(dt)
});

// when player touched objects event
// 플레이어가 오브젝트와 부딪혔을 때
ScriptApp.onDestroy.Add(function () {
  ScriptMap.clearAllObjects();
});

// when player attacked other player event (z key)
// 플레이어가 다른 플레이어를 공격혔을 때 (Z키)
ScriptApp.onUnitAttacked.Add(function (sender, x, y, target) {
  if (_state != STATE_PLAYING) return;

  // not stun, not invincible, not on the same team
  // 스턴상태가 아니고, 무적이 아니고, 같은 팀이 아니면 스턴을 건다.
  if (
    !target.tag.sturn &&
    sender.tag.team != target.tag.team &&
    !target.tag.super
  ) {
    target.tag.sturn = true;
    target.moveSpeed = 0;
    target.sendUpdated();
  }
});

// called every 20ms
// 20ms 마다 호출되는 업데이트
// param1 : deltatime ( elapsedTime )
ScriptApp.onUpdate.Add(function (dt) {
  if (!_start) return;

  _stateTimer += dt;

  switch (_state) {
    case STATE_INIT:
      ScriptApp.showCenterLabel(
        "The team that has painted the most land wins.\nHitting another teammate stuns them for 1 second."
      );

      if (_stateTimer >= 5) {
        startState(STATE_READY);
      }
      break;
    case STATE_READY:
      ScriptApp.showCenterLabel("The game will start soon.");
      if (_stateTimer >= 3) {
        startState(STATE_PLAYING);
      }
      break;
    case STATE_PLAYING:
      ScriptApp.showCenterLabel(
        _timer +
          `\nRED TEAM  VS  BLUE TEAM\n` +
          _redScore +
          "  VS  " +
          _blueScore
      );
      if (_stateTimer >= 1) {
        _stateTimer = 0;
        _timer--;
      }

      // time over
      if (_timer <= 0) {
        if (_redScore > _blueScore) {
          for (let i in _players) {
            let p = _players[i];
            p.title = null;
            if (p.tag.team == 1) {
              p.sprite = tomb;
              p.moveSpeed = 0;
              p.sendUpdated();
            }
          }
          _resultStr =
            "RED TEAM  VS  BLUE TEAM\n" +
            _redScore +
            "  VS  " +
            _blueScore +
            "\nRED TEAM WIN";
        } else if (_redScore < _blueScore) {
          for (let i in _players) {
            let p = _players[i];
            p.title = null;
            if (p.tag.team == 0) {
              p.sprite = tomb;
              p.moveSpeed = 0;
              p.sendUpdated();
            }
            _resultStr =
              "RED TEAM  VS  BLUE TEAM\n" +
              _redScore +
              "  VS  " +
              _blueScore +
              "\nBLUE TEAM WIN";
          }
        } else {
          for (let i in _players) {
            let p = _players[i];
            p.title = null;
            p.sprite = null;
            p.sendUpdated();
          }
          _resultStr =
            "RED TEAM  VS  BLUE TEAM\n" +
            _redScore +
            "  VS  " +
            _blueScore +
            "\nDRAW";
        }
        startState(STATE_JUDGE);
      } else {
        for (let i in _players) {
          let p = _players[i];

          // for speed buff
          if (_timer == 30 || _timer == 20 || _timer == 10) {
            if (_redScore > _blueScore) {
              if (p.tag.team == 1) {
                // set player title
                p.title = "<SPEED UP>";
                p.moveSpeed = 90;
                p.sendUpdated();
              } else {
                p.title = null;
                p.moveSpeed = 80;
                p.sendUpdated();
              }
            } else if (_redScore < _blueScore) {
              if (p.tag.team == 0) {
                p.title = "<SPEED UP>";
                p.moveSpeed = 90;
                p.sendUpdated();
              } else {
                p.title = null;
                p.moveSpeed = 80;
                p.sendUpdated();
              }
            }
          }

          // strun state check
          if (p.tag.sturn) {
            p.tag.sTime -= dt;
            if (p.tag.sTime <= 0) {
              p.tag.sturn = false;
              p.tag.super = true;
              p.tag.sTime = 1;
              p.moveSpeed = 80;
              p.sendUpdated();
            }
          }

          // invincible state check
          if (p.tag.super) {
            p.tag.sTime -= dt;
            if (p.tag.sTime <= 0) {
              p.tag.super = false;
              p.tag.sTime = 1;
              p.sendUpdated();
            }
          }

          // paint tile and update score
          if (p.tag.x != p.tileX || p.tag.y != p.tileY) {
            p.tag.x = p.tileX;
            p.tag.y = p.tileY;

            let oldValue = _objects[p.tileY * HEIGHT_KEY + p.tileX];
            if (oldValue == p.tag.team) continue;

            if (oldValue == 0) {
              _redScore--;
            } else if (oldValue == 1) {
              _blueScore--;
            }

            if (p.tag.team == 0) _redScore++;
            else _blueScore++;

            _objects[p.tileY * HEIGHT_KEY + p.tileX] = p.tag.team;

            ScriptMap.putObject(
              p.tileX,
              p.tileY,
              p.tag.team == 0 ? red : blue,
              {
                overlap: true,
              }
            );
          }
        }
      }
      break;
    case STATE_JUDGE:
      ScriptApp.showCenterLabel(_resultStr);

      if (_stateTimer >= 5) {
        startState(STATE_END);
      }
      break;
    case STATE_END:
      break;
  }
});
