import { ScriptDynamicResource } from "./ScriptDynamicResource";
import { ScriptWidget } from "./ScriptWidget";

export enum ColorType {
  WHITE,
  BLACK,
  RED,
  GREEN,
  BLUE,
  ORANGE,
  PURPLE,
  GRAY,
  YELLOW,
  MAGENTA,
  CYAN,
}
export type ShowBuyAlertOption = {
  /**
   * 구매창에 표시할 텍스트를 설정 할 수 있습니다.
   */
  message?: string;
  /**
   * 구매창을 표시할 시간(ms)을 설정할 수 있습니다.
   */
  timer?: number;
};

export type BuyAlertResult = {
  Refund: () => {};
};

export class ScriptPlayer {
  /**
   * 플레이어 ID (Read Only)
   */
  readonly id: string;
  /**
   * 플레이어 이름
   */
  name: string;
  /**
   * 닉네임 위에 노란색으로 노출시킬 텍스트
   */
  title: string;
  /**
   * 플레이어 권한(Read Only)
   */
  readonly role: number;
  /**
   * 타일 X 좌표
   */
  tileX: number;
  /**
   * 타일 Y 좌표
   */
  tileY: number;
  /**
   * 바라보는 방향
   */
  dir: number;
  /**
   * 움직이는 속도(기본 80)
   */
  moveSpeed: number;
  /**
   * 스프라이트 변경(기본:  null)
   */
  sprite: ScriptDynamicResource;
  /**
   * 필요한 속성값을 부여 가능
   */
  tag: any;
  /**
   * 다른 플레이어에게 보여짐 여부
   */
  hidden: boolean;
  /**
   * 스팟라이트 기능 활성화 여부
   */
  spotlight: boolean;
  /**
   * 화상비디오 가능 여부
   */
  disableVideo: boolean;
  /**
   * 화상오디오 가능 여부
   */
  disableAudio: boolean;
  /**
   * 어택 타입(기본 : 0, 원거리공격 : 2)
   */
  attackType: number;
  /**
   * 어택 스프라이트 변경(기본: null)
   */
  attackSprite: ScriptDynamicResource;
  /**
   * 그림이 날아가는 거리(기준: Tile)
   */
  attackParam1: number;
  /**
   * 실제 영향이 미치는 거리(기준: Tile)
   * attackType이 2인 경우 유효
   */
  attackParam2: number;
  /**
   * 전자지갑 주소(Read Only)
   */
  walletAddress: string;
  /**
   * 스페이스 내의 플레이어 값 저장공간(스페이스 한정)
   */
  storage: string;

  /**
   * 플레이어의 타이틀 색상을 읽거나 수정 할 수 있습니다.
   * Enum 값 또는 컬러  Hex Code 값을 입력할 수 있습니다.
   */
  titleColor: ColorType | number;

  /**
   * 플레이어의 화면 줌 비율을 조절 할 수 있습니다.
   */
  displayRatio: number;

  /**
   * 플레이어의 이메일해쉬
   */
  emailHash: string;

  /**
   * 플레이어의 모바일 접속 여부를 true/false 로 출력
   */
  readonly isMobile: boolean;

  /**
   * 플레이어가 움직이고 있으면 True, 아니면 False를 반환
   */
  readonly isMoving: boolean;

  /**
   * 플레이어가 점프하고 있으면 True, 아니면 False를 반환
   */
  readonly isJumping: boolean;

  /**
   * 비로그인 플레이어인 경우 true 값을 반환
   */
  readonly isGuest: boolean;

  /**
   * 플레이어에게 지정된 위치에 해당 text를 3초간 표시
   * @param text 출력할 텍스트 값
   * @param color 텍스트 색상
   * @param bgColor 라벨 배경 색상
   * @param offset 라벨 표시 위치 조정 값
   * @param time 라벨 표시 시간 (default 3000)
   */
  showCenterLabel(
    text: string,
    color?: number,
    bgColor?: number,
    offset?: number,
    time?: number
  ): void;

  /**
   * 플레이어에게 지정된 위치에 해당 text를 3초간 표시. span태그 사용 가능
   * @param text 출력할 텍스트 값, span태그 사용 가능
   * @param color 텍스트 색상
   * @param bgColor 라벨 배경 색상
   * @param offset 라벨 표시 위치 조정 값
   * @param width 라벨의 너비 n% (0 ~ 100)
   * @param opacity 라벨 배경색 투명도 (0 ~ 1)
   * @param time 라벨 표시 시간 (default 3000)
   */
  showCustomLabel(
    text: string,
    color?: number,
    bgColor?: number,
    offset?: number,
    width?: number,
    opacity?: number,
    time?: number
  ): void;

  /**
   * 플레이어에게 지정된 align의 위치에 해당 html파일을 위젯으로 불러옴
   */
  showWidget(
    fileName: string,
    align: string,
    width: number,
    height: number
  ): ScriptWidget;

  /**
   * 플레이어의 이메일을 확인
   */
  isEmail(email: string): boolean;

  /**
   * 플레이어가 서있는 구역이름을 호출
   */
  getLocationName(): string;

  /**
   * 플레이어를 해당 좌표로 소환
   */
  spawnAt(tileX: number, tileY: number, dir: number): void;

  /**
   * 플레이어를 해당 구역으로 소환
   */
  spawnAtLocation(name: string, dir: number): void;

  /**
   * 플레이어를 해당 스페이스 해당 맵으로 이동시키기
   */
  spawnAtMap(worldHashID: string, mapHashID: string): void;

  /**
   * 플레이어에게 사운드를 재생
   * @param fileName
   * @param loop
   * @param overlap 사운드 오버랩(겹침) 재생 가능 여부
   */
  playSound(fileName: string, loop?: boolean, overlap?: boolean): void;

  /**
   * 플레이어에게 링크에 해당하는 사운드를 재생
   */
  playSoundLink(link: string, loop: boolean): void;

  /**
   * 플레이어 필드값을 수정한 후 업데이트
   */
  sendUpdated(): void;

  /**
   * 플레이어 스토리지값을 저장
   */
  save(): void;

  /**
   * 플레이어 개인에게 채팅 메시지를 보냅니다.
   * @param message 라벨에 출력할 텍스트
   * @param color 출력할 글씨의 색을 지정합니다. (HexCode), 값을 입력하지 않을 경우, 흰색(0xFFFFFF)으로 적용됩니다.
   */
  sendMessage(message: string, color?: number): void;

  /**
   * 플레이어 개인에게 채팅 메시지를 보냅니다.
   * @param itemName 구매창에 표시할 아이템의 이름
   * @param price 아이템의 가격 (화폐단위: ZEM)
   * @param callback 구매 성공시 동작할 콜백함수
   * @param payToSpaceOwner false인 경우 앱 소유자에게 수익이 전달되고, true인 경우 맵 소유자에게 수익이 전달됩니다. (default: false)
   * @param option message : 구매창에 표시할 텍스트를 설정 할 수 있습니다. / timer : 구매창을 표시할 시간(ms)을 설정할 수 있습니다.
   */
  showBuyAlert(
    itemName: string,
    price: number,
    callback: (result: number, buyAlertResult: BuyAlertResult) => void,
    payToSpaceOwner?: boolean,
    option?: ShowBuyAlertOption
  ): void;

  /**
   * 플레이어의 구매 위젯을 닫습니다.
   */
  hideByAlert(): void;

  /**
   * 플레이어에게 웹 URL을 새 창이나 팝업 창으로 표시합니다.
   * @param link 연결할 웹 url 주소
   * @param popup true 인 경우, url 창을 팝업 형태로 표시합니다.
   */
  openWebLink(link: string, popup?: boolean): void;

  /**
   * 해당 플레이어에게 지정된 align의 위치에 url 임베드  화면을 표시하는 함수입니다.
   * @param url 웹 url 주소
   * @param align 임베드를 표시할 위치
   * @param width 임베드 가로 크기(px)
   * @param height 임베드 세로 크기(px)
   * @param hasBackdrop true일 경우 임베드의 바깥 배경에 그림자를 표시합니다.
   */
  showEmbed(
    url: string,
    align: string,
    width: number,
    height: number,
    hasBackdrop?: boolean
  ): void;

  /**
   * 플레이어에게 입력창을 보여주고, 플레이어의 응답에 따라 동작하는 callback 함수를 작성할 수 있습니다.
   * @param text
   * @param callback
   */
  showPrompt(text: string, callback: (inputText: string) => {}): void;

  /**
   * 플레이어에게 확인창을 보여주고, 플레이어가 OK를 눌렀을 때 동작하는 callback 함수를 작성할 수 있습니다.
   * cancel을 누를 경우에는 callback 함수가 동작하지 않습니다.
   * @param text
   * @param callback
   */
  showConfirm(text: string, callback: (res: boolean) => {}): void;

  /**
   * 플레이어에게 경고창을 보여주고, 플레이어가 OK를 눌렀을 때 동작하는 callback 함수를 작성할 수 있습니다.
   * @param text
   * @param callback
   */
  showAlert(text: string, callback: (res: boolean) => {}): void;

  /**
   * @private
   * @param key
   */
  localize(key: string): string;
}
