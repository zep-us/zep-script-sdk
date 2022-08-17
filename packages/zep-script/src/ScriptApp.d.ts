import { ScriptDynamicResource } from "./ScriptDynamicResource";
import { ScriptPlayer } from "./ScriptPlayer";
import { ScriptWidget } from "./ScriptWidget";

declare global {
  namespace ScriptApp {
    /**
     * ==========================================
     *                  Fields
     * ==========================================
     */

    /**
     * App이 설치된 스페이스의 해쉬값 (Read Only)
     */
    const worldHashID: string;

    /**
     * App이 설치된 맵의 해쉬값 (Read Only)
     */
    const mapHashID: string;

    /**
     * 맵에 있는 모든 플레이어 리스트 (Read Only)
     */
    const players: ScriptPlayer[];

    /**
     * 맵에 있는 모든 플레이어의 수 (Read Only)
     */
    const playerCount: number;

    /**
     * App을 실행한 플레이어의 ID 값 (Read Only)
    */
    const creatorID: number;

    /**
     * 화면의 줌을 컨트롤 하는 값 (기본 값: 1)
     */
    let displayRatio: number;

    /**
     * 0 = NONE : 아무 효과 없음
     * 1 = SPOTLIGHT : 비네팅 효과 적용
     */
    let cameraEffect: number;

    /**
     * cameraEffect가 NONE이 아닐 경우의 상태값 : 클수록 영역이 커진다.
     */
    let cameraEffectParam1: number;

    /**
     * 스페이스 내의 App 값 저장공간(스페이스 한정)
     */
    let storage: string;

    /**
     * App의 따라가기 기능 활성화 여부
     */
    let followPlayer: boolean;

    /**
     * ==========================================
     *              Event Listeners
     * ==========================================
     */

    /**
     * App 실행 시에 최초로 호출되는 이벤트 (유저 진입 전)
     * Normal App과 Sidebar App은 Script 적용 후 맵이 실행될 때 호출
     */
    namespace onInit {
      function Add(callback: () => void): void;
    }

    /**
     * 플레이어가 스페이스에서 나갈 때 호출 되는 이벤트
     */
    namespace onJoinPlayer {
      function Add(callback: (player: ScriptPlayer) => void): void;
    }

    /**
     * 플레이어 모두 진입 시 최초로 시작되는 이벤트
     */
    namespace onStart {
      function Add(callback: () => void): void;
    }

    /**
     * 20ms 마다 호출되는 이벤트
     * dt: deltatime(전 프레임이 완료되기까지 걸린 시간)
     */
    namespace onUpdate {
      function Add(callback: (dt: number) => void): void;
    }

    /**
     * 플레이어가 스페이스에서 나갈 때 호출 되는 이벤트
     */
    namespace onLeavePlayer {
      function Add(callback: (player: ScriptPlayer) => void): void;
    }

    /**
     * App 종료 시 마지막으로 호출
     * Normal App과 Sidebar App은 별도의 종료
     */
    namespace onDestroy {
      function Add(callback: () => void): void;
    }

    /**
     * 플레이어들이 채팅창에 입력하는 모든 채팅에 대해 호출 되는 이벤트
     * !로 시작하는 텍스트는 채팅창에 나오지 않으나, onSay 함수에는 사용 가능
     */
    namespace onSay {
      function Add(
        callback: (player: ScriptPlayer, text: string) => void
      ): void;
    }

    /**
     * 플레이어가 다른 플레이어와 부딪혔을 때 호출 되는 이벤트
     */
    namespace onPlayerTouched {
      function Add(
        callback: (
          sender: ScriptPlayer,
          target: ScriptPlayer,
          x: number,
          y: number
        ) => void
      ): void;
    }

    /**
     * 플레이어가 오브젝트와 부딪혔을 때 호출 되는 이벤트
     */
    namespace onObjectTouched {
      function Add(
        callback: (
          sender: ScriptPlayer,
          x: number,
          y: number,
          tileID: number
        ) => void
      ): void;
    }

    /**
     * 플레이어가 다른 플레이어를 공격했을 때 (Z키) 호출 되는 이벤트
     */
    namespace onUnitAttacked {
      function Add(
        callback: (
          sender: ScriptPlayer,
          x: number,
          y: number,
          target: ScriptPlayer
        ) => void
      ): void;
    }

    /**
     * 플레이어가 오브젝트를 공격(Z키)했을 때 호출 되는 이벤트
     */
    namespace onObjectAttacked {
      function Add(
        callback: (sender: ScriptPlayer, x: number, y: number) => void
      ): void;
    }

    /**
     * 플레이어가 사이드바 앱을 클릭(터치) 했을 때 호출 되는 이벤트
     */
    namespace onSidebarTouched {
      function Add(
        callback: (sender: ScriptPlayer) => void
      ): void;
    }

    /**
     * time(초) 후에 callback 함수를 실행
     * @param callback
     * @param time
     */
    function runLater(callback: () => void, time: number): void;

    /**
     * 플레이어가 해당 위치의 타일과 부딪혔을 때 실행
     * @param x
     * @param y
     * @param callback
     */
    function addOnTileTouched(
      x: number,
      y: number,
      callback: (player: ScriptPlayer) => void
    ): void;

    /**
     * 플레이어가 지정한 위치와 부딪혔을 때 실행
     * @param name
     * @param callback
     */
    function addOnLocationTouched(
      name: string,
      callback: (player: ScriptPlayer) => void
    ): void;

    /**
     * 플레이어가 지정된 키를 눌렀을 때 실행
     * @param keycode
     * @param callback
     */
    function addOnKeyDown(
      keycode: number,
      callback: (player: ScriptPlayer) => void
    ): void;

    /**
     * ==========================================
     *                 UI Methods
     * ==========================================
     */

    /**
     * 스프라이트 시트 그림 파일을 읽어 객체화
     * @param fileName
     * @param frameWidth
     * @param frameHeight
     * @param anims
     * @param frameRate
     */

    function loadSpritesheet(
      fileName: string,
      frameWidth?: number,
      frameHeight?: number,
      anims?: number[] | {"left"?: number[], "up"?: number[], "down"?: number[], "right"?: number[], "dance"?: number[], "down_jump"?: number[], "left_jump"?: number[], "right_jump"?: number[], "up_jump"?: number[]},
      frameRate?: number
    ): ScriptDynamicResource;

    /**
     * 모든 플레이어에게 지정된 위치에 해당 text를 1초간 표시
     * @param text 출력할 텍스트 값
     * @param color 텍스트 색상
     * @param bgColor 라벨 배경 색상
     * @param offset 라벨 표시 위치 조정 값
     */
    function showCenterLabel(
      text: string,
      color?: number,
      bgColor?: number,
      offset?: number
    ): void;

    /**
     * 모든 플레이어에게 지정된 위치에 해당 text를 1초간 표시. span태그 사용 가능
     * @param text 출력할 텍스트 값, span태그 사용 가능
     * @param color 텍스트 색상
     * @param bgColor 라벨 배경 색상
     * @param offset 라벨 표시 위치 조정 값
     * @param width 라벨의 너비 n% (0 ~ 100)
     * @param opacity 라벨 배경색 투명도 (0 ~ 1)
     */
     function showCustomLabel(
      text: string,
      color?: number,
      bgColor?: number,
      offset?: number,
      width?: number,
      opacity?: number
    ): void;

    /**
     * 채팅창에 해당 text내용을 출력
     * @param text
     * @param color
     */
    function sayToAll(text: string, color?: number): void;

    /**
     * 해당 ID의 Widget을 가져오기
     * @param id
     */
    function getWidgetByID(id: number): ScriptWidget;

    /**
     * 모든 플레이어에게 지정된 align의 위치에 해당 html파일을 위젯으로 불러오기
     * @param fileName
     * @param align
     * @param width
     * @param height
     */
    function showWidget(
      fileName: string,
      align: string,
      width: number,
      height: number
    ): ScriptWidget;

    /**
     * 모든 플레이어에게 지정된 align의 위치에 해당 YouTube link의 동영상을 재생시킴
     * @param link
     * @param align
     * @param width
     * @param height
     */
    function showYoutubeWidget(
      link: string,
      align: string,
      width: number,
      height: number
    ): ScriptWidget;

    /**
     * ==========================================
     *            User Control Methods
     * ==========================================
     */

    /**
     * playerID 에 해당하는 플레이어를 tileX, tileY 좌표로 소환한다.
     * @param playerID
     * @param tileX
     * @param tileY
     */
    function spawnPlayer(playerID: string, tileX: number, tileY: number): void;

    /**
     * playerID 에 해당하는 플레이어를 추방한다.
     * 추방당한 유저는 24시간 동안 해당 스페이스에 접근하지 못하게 된다.
     * @param playerID
     */
    function kickPlayer(playerID: string): void;

    /**
     * ==========================================
     *               Sound Methods
     * ==========================================
     */

    /**
     * 모든 플레이어에게 사운드를 재생
     * @param fileName
     * @param loop
     */
    function playSound(fileName: string, loop?: boolean): void;

    /**
     * 모든 플레이어에게 링크에 해당하는 사운드를 재생
     * @param link
     * @param loop
     */
    function playSoundLink(link: string, loop?: boolean): void;

    /**
     * 모든 재생되는 사운드를 멈춤
     */
    function stopSound(): void;

    /**
     * ==========================================
     *           Communication Methods
     * ==========================================
     */

    /**
     * 해당 URL에 HTTP Get 요청을 실행
     * @param url
     * @param headers
     * @param callback
     */
    function httpGet(
      url: string,
      headers: object,
      callback: (response: string) => void
    ): void;

    /**
     * 해당 URL에 HTTP Post 포스팅을 실행
     * @param url
     * @param headers
     * @param body
     * @param callback
     */
    function httpPost(
      url: string,
      headers: object,
      body: object,
      callback: (response: string) => void
    ): void;

    /**
     * ==========================================
     *              Common Methods
     * ==========================================
     */

    /**
     * App 관련 필드값이 변경되면 변경값을 적용함
     */
    function sendUpdated(): void;

    /**
     * App 스토리지 값을 저장
     */
    function save(): void;
		
  }
}
