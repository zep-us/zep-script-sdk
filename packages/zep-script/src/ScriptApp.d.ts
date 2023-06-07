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
    const spaceHashID: string;

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
    const creatorID: string;

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
     * App의 HashId
     */
    let appHashID: string;

    /**
     * 플레이어 닉네임 숨김 여부
     */
    let showName: boolean;

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
          tileID: number,
          obj: object
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
     * 플레이어가 공격 키(Z)로 키 값을 가진 오브젝트를 공격할 때 동작합니다.
     */
    namespace onAppObjectAttacked {
      function Add(
        callback: (
          sender: ScriptPlayer,
          x: number,
          y: number,
          layer: number,
          key: string
        ) => void
      ): void;
    }

    /**
     * 플레이어가 사이드바 앱을 클릭(터치) 했을 때 호출 되는 이벤트
     */
    namespace onSidebarTouched {
      function Add(callback: (sender: ScriptPlayer) => void): void;
    }

    /**
     * 플레이어가 사이드바 앱을 클릭(터치) 했을 때 호출 되는 이벤트
     */
    namespace onAppObjectTouched {
      function Add(
        callback: (
          sender: ScriptPlayer,
          key: string,
          x: number,
          y: number
        ) => void
      ): void;
    }

    /**
     * 클라이언트에서 window.parent.postMessage를 사용해 메시지를 보내는 경우 callback 함수를 실행합니다.
     */
    namespace onPostMessage {
      function Add(
        callback: (player: ScriptPlayer, body: string) => void
      ): void;
    }

    /**
     * 오브젝트와 F 상호작용 시 동작하는 함수를 작성할 수 있습니다.
     * 맵에디터로 설치한 오브젝트와 상호작용 시 동작합니다.
     * 오브젝트인 경우 layerId = 3
     * 상단 오브젝트인 경우 layerId = 5
     */
    namespace onTriggerObject {
      function Add(
        callback: (
          player: ScriptPlayer,
          layerId: number,
          x: number,
          y: number
        ) => void
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
     * App.getStorage 함수는 앱이 실행중인 같은 스페이스 내 다른 맵의  App storage 데이터 변경 여부를 체크하여
     * 같은 데이터를 가지도록 동기화 해주는 함수입니다.
     * @param callback
     */
    function getStorage(callback: () => void): void;

    /**
     * App.setStorage 함수는 기존 App storage 데이터 저장 방식을 보완한 데이터 저장 함수입니다.
     * @param string
     */
    function setStorage(string: string): void;

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
     * enable이 true이면 모바일 환경에서 펀치 버튼이 추가
     * @param enabled
     */
    function putMobilePunch(enabled?: boolean): void;

    /**
     * 모바일 환경에서 커스텀 모바일 버튼을 추가하고, 버튼을 눌렀을 때 동작하는 함수를 지정
     * @param anchor
     * @param posX
     * @param posY
     * @param callback
     */
    function addMobileButton(
      anchor: number,
      posX: number,
      posY: number,
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
      anims?:
        | number[]
        | {
            left?: number[];
            up?: number[];
            down?: number[];
            right?: number[];
            dance?: number[];
            down_idle?: number[];
            left_idle?: number[];
            right_idle?: number[];
            up_idle?: number[];
            down_jump?: number[];
            left_jump?: number[];
            right_jump?: number[];
            up_jump?: number[];
          },
      frameRate?: number
    ): ScriptDynamicResource;

    /**
     * 모든 플레이어에게 지정된 위치에 해당 text를 1초간 표시
     * @param text 출력할 텍스트 값
     * @param color 텍스트 색상
     * @param bgColor 라벨 배경 색상
     * @param offset 라벨 표시 위치 조정 값
     * @param time 라벨 표시 시간 (default 3000)
     */
    function showCenterLabel(
      text: string,
      color?: number,
      bgColor?: number,
      offset?: number,
      time?: number
    ): void;

    /**
     * 모든 플레이어에게 지정된 위치에 해당 text를 1초간 표시. span태그 사용 가능
     * @param text 출력할 텍스트 값, span태그 사용 가능
     * @param color 텍스트 색상
     * @param bgColor 라벨 배경 색상
     * @param offset 라벨 표시 위치 조정 값
     * @param width 라벨의 너비 n% (0 ~ 100)
     * @param opacity 라벨 배경색 투명도 (0 ~ 1)
     * @param time 라벨 표시 시간 (default 3000)
     */
    function showCustomLabel(
      text: string,
      color?: number,
      bgColor?: number,
      offset?: number,
      width?: number,
      opacity?: number,
      time?: number
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
     * @param overlap 사운드 오버랩(겹침) 재생 가능 여부
     */
    function playSound(
      fileName: string,
      loop?: boolean,
      overlap?: boolean
    ): void;

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
     * 찌르기(Z키) 공격 효과음을 변경하는 함수입니다.
     */
    function changeAttackSound(fileName: string): void;

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
     * 해당 URL에 Json 형태의 http post 요청을 보내는 함수
     * @param url
     * @param headers
     * @param body
     * @param callback
     */
    function httpPostJson(
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

    /**
     * 미니게임 앱을 강제 종료하는 함수
     */
    function forceDestroy(): void;

    /**
     * 모든 채팅 내용을 삭제하는 함수
     */
    function clearChat(): void;

    /**
     * id 에 해당하는 플레이어를 반환하는 함수입니다.
     */
    function getPlayerByID(playerID: string): ScriptPlayer;

    /**
     * 로드한 이미지로 펀치 버튼을 만들어 추가합니다.
     */
    function putMobilePunchWithIcon(icon: ScriptDynamicResource): void;
  }
}
