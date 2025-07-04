import { CameraEffectType } from "./CameraEffectType";
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

export type CustomCenterLabelOption = {
  /**
   * 라벨에 키 값을 할당하여, 서로 다른 키 값을 가진 라벨은 동시에 표시할 수 있습니다.
   */
  key?: string;
  /**
   * 라벨의 모서리에 둥글기를 설정할 수 있습니다.
   *  ex) borderRadius: "8px"
   */
  borderRadius?: string;
  /**
   * false로 설정시 폰트에 투명도가 적용되지 않습니다.
   */
  fontOpacity?: boolean;
  /**
   * 라벨 내부에 padding 값을 지정 할 수 있습니다.
   * ex) padding: "8px"
   */
  padding?: string;
}


export type PopupOption = {
  /**
   * 입력창 위에 출력할 텍스트 (Default: null)
   */
  content?: string;
  /**
   * confirm 버튼의 색상 (Default: "primary")
   * - 'primary': 푸른색,
   * - 'alert': 붉은색
   */
  confirmVariant?: "primary" | "alert" ;
  /**
   * cancel 버튼의 텍스트 (Default: "취소")
   */
  cancelText?: string;
  /**
   * confirm 버튼의 텍스트 (Default: "확인")
   */
  confirmText?: string;
  /**
   * input placeholder 텍스트 (Default: null)
   */
  placeholder?: string;
  /**
   * 입력 타입 (Default: "text")
   * - 'text': 입력 값을 텍스트로 표시
   * - 'password': 입력 값을 *로 표시
   */
  textType?: 'text' | 'password';
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
  readonly tileX: number;
  /**
   * 타일 Y 좌표
   */
  readonly tileY: number;
  /**
   * 바라보는 방향
   */
  readonly dir: number;
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
  readonly walletAddress: string;
  /**
   * 스페이스 내의 플레이어 값 저장공간(스페이스 한정)
   */
  storage: string;

  /** 
   * URL 쿼리스트링으로 전달 받은 값을 저장하는 필드
   */
  readonly customData: string;

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
   * 플레이어의 이메일 해시값
   */
  readonly emailHash: string;

  /**
   * 플레이어의 모바일 접속 여부
   */
  readonly isMobile: boolean;

  /**
   * 플레이어의 태블릿 접속 여부
   */
  readonly isTablet: boolean;

  /**
   * 플레이어가 움직이고 있으면 true, 아니면 false를 반환
   */
  readonly isMoving: boolean;

  /**
   * 플레이어가 점프하고 있으면 true, 아니면 false를 반환
   */
  readonly isJumping: boolean;

  /**
   * 플레이어가 앉아 있으면 true, 아니면 false를 반환
   */
  readonly isSitting: boolean;

  /**
   * 비로그인 플레이어인 경우 true 값을 반환
   */
  readonly isGuest: boolean;

  /**
   * 플레이어의 브라우저에서 사용하는 언어 설정 값
   */
  readonly language: string;

  /**
   * 5분 이상 비활성화된 유저인 경우 true값을 가집니다.
   */
  readonly away: boolean;

  /**
   * 플레이어의 맵 둘러보기 허용 여부를 설정할 수 있습니다.
   */
  enableFreeView: boolean;

  /** 
   * 플레이어의 찌르기 공격 허용 여부를 설정할 수 있습니다.
  */
  disableAttack: boolean;

  /**
   * 0 = NONE : 아무 효과 없음
   * 1 = SPOTLIGHT : 비네팅 효과 적용
   */
  cameraEffect: CameraEffectType;

  /**
   * cameraEffect가 SPOTLIGHT일 경우, cameraEffectParam1이 클수록 영역이 커진다.
   */
  cameraEffectParam1: number;

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
   * @param option
   */
  showCustomLabel(
    text: string,
    color?: number,
    bgColor?: number,
    offset?: number,
    width?: number,
    opacity?: number,
    time?: number,
    option?: CustomCenterLabelOption
  ): void;

  /**
   * 플레이어에게 지정된 align의 위치에 해당 html파일을 위젯으로 불러옴
   */
  showWidget(
    fileName: string,
    align: "popup" | "sidebar" | "top" | "topleft" | "topright" | "middle" | "middleleft" | "middleright" | "bottom" | "bottomleft" | "bottomright",
    width: number,
    height: number
  ): ScriptWidget;

  /**
   * 플레이어의 이메일이 특정 값과 일치하는지 확인합니다.
   * @param email 비교할 이메일 문자열
   * @returns 일치하면 true, 아니라면 false
   */
  isEmail(email: string): boolean;

  /**
   * 플레이어가 서있는 구역이름을 호출
   */
  getLocationName(): string;

  /**
   * 플레이어를 해당 좌표로 소환
   */
  spawnAt(tileX: number, tileY: number, dir?: number): void;

  /**
   * 플레이어를 해당 구역으로 소환
   */
  spawnAtLocation(name: string, dir?: number): void;

  /**
   * 플레이어를 해당 스페이스 해당 맵으로 이동시키기
   */
  spawnAtMap(worldHashID: string, mapHashID: string): void;

  /**
   * 플레이어에게 사운드를 재생
   * @param fileName 플레이할 사운드 파일의 경로
   * @param loop 사운드 반복 재생 여부
   * @param overlap 사운드 오버랩(겹침) 재생 가능 여부
   * @param key 사운드 오버랩(겹침) 재생 시 사용할 키 값
   * @param volume 사운드의 볼륨을 조절하는 데 사용되는 숫자입니다. 값의 범위는 0에서 1까지이며, 0은 소리가 없음을 나타내고, 1은 최대 볼륨을 나타냅니다.
   */
  playSound(fileName: string, loop?: boolean, overlap?: boolean, key?: string, volume?: number): void;

  /**
   * 플레이어에게 링크에 해당하는 사운드를 재생
   * @param link 플레이할 사운드 파일의 URL
   * @param loop 사운드 반복 재생 여부
   */
  playSoundLink(link: string, loop: boolean): void;

  /**
   * 플레이어에게 재생되고 있는 사운드를 종료
   * @param key 중단할 사운드의 키 값
   */
  stopSound(key?: string): void;

  /**
   * 변경된 플레이어 필드 값 반영
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
   * @param option 구매창의 메시지 및 타이머를 설정하는 옵션 객체입니다.
   * - message : 구매창에 표시할 텍스트
   * - timer : 구매창을 표시할 시간(ms)
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
  hideBuyAlert(): void;

  /**
   * 플레이어에게 위젯의 상/하/좌/우 여백을 화면 크기에 대한 %비율로 정의하여 위젯을 표시합니다.
   * @param fileName 불러올 위젯 파일의 경로
   * @param marginTop 화면 크기에 대한 비율로 정의하는 위젯 상단의 여백 (%)
   * @param marginRight 화면 크기에 대한 비율로 정의하는 위젯 우측의 여백 (%)
   * @param marginBottom 화면 크기에 대한 비율로 정의하는 위젯 하단의 여백 (%)
   * @param marginLeft 화면 크기에 대한 비율로 정의하는 위젯 좌측의 여백 (%)
   */
  showWidgetResponsive(fileName: string, marginTop: number, marginRight: number, marginBottom: number, marginLeft: number): void;

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
    align: "sidebar" | "top" | "topleft" | "topright" | "middle" | "middleleft" | "middleright" | "bottom" | "bottomleft" | "bottomright",
    width: number,
    height: number,
    hasBackdrop?: boolean
  ): void;

  /**
   * 플레이어에게 입력창을 보여주고, 플레이어의 응답에 따라 동작하는 callback 함수를 작성할 수 있습니다.
   * @param text
   * @param callback
   */
  showPrompt(text: string, callback?: (res: string) => void, option?: PopupOption): void;

  /**
   * 플레이어에게 확인창을 보여주고, 플레이어가 OK를 눌렀을 때 동작하는 callback 함수를 작성할 수 있습니다.
   * cancel을 누를 경우에는 callback 함수가 동작하지 않습니다.
   * @param text
   * @param callback
   */
  showConfirm(text: string, callback?: (res: boolean) => void, option?: PopupOption): void;

  /**
   * 플레이어에게 경고창을 보여주고, 플레이어가 OK를 눌렀을 때 동작하는 callback 함수를 작성할 수 있습니다.
   * @param text
   * @param callback
   * @param option
   */
  showAlert(text: string, callback?: (res: boolean) => void, option?: PopupOption): void;

  /**
   * @private
   * @param key
   */
  localize(key: string): string;

  /**
   * 플레이어에게 입력한 이미지 주소에 해당하는 이미지를 표시합니다.
   * @param url 이미지 url
   */
  showImageModal(url: string): void;

  /**
   * 플레이어에게 텍스트 창을 보여주는 함수입니다.
   * @param text 표시할 텍스트
   */
  showNoteModal(text: string): void;

  /**
   * 플레이어의 시점을 지정된 좌표로 중심 이동시킵니다.
   * @param tileX x좌표
   * @param tileY y좌표
   * @param time 시점이 목표 지점까지 이동하는데 걸리는 시간(초)
   */
  setCameraTarget(tileX: number, tileY: number, time?: number): void;

  /**
   * 플레이어의 시점을 특정 오브젝트로 중심 이동시킵니다.
   * @param key 오브젝트의 키 값
   * @param time 시점이 목표 지점까지 이동하는데 걸리는 시간(초)
   */
  setCameraTarget(key: string, time?: number): void;
  
  /**
   * 플레이어의 배경 또는 전경 이미지를 설정 할 수 있습니다.
   * @param resource 스크립트에 로드한 이미지 객체
   * @param offsetX px 단위로 x 축 방향의 오프셋을 설정할 수 있는 속성
   * @param offsetY px 단위로 y 축 방향의 오프셋을 설정할 수 있는 속성
   * @param type 설정타입, 0: 배경 설정 , 1 : 전경 설정
   */
  setEffectSprite(resource: ScriptDynamicResource | null, offsetX: number, offsetY: number, type: number): void;

  /**
   * 플레이어에게 효과 스프라이트를 재생합니다.
   * @param resource 효과 스프라이트에 사용할 ScriptDynamicResource 객체
   * @param repeatNum 효과 스프라이트의 반복 횟수
   * @param offsetX 효과 스프라이트의 X 축 오프셋 값
   * @param offsetY 효과 스프라이트의 Y 축 오프셋 값
   */
  playEffectSprite(resource: ScriptDynamicResource | null, repeatNum: number, offsetX: number, offsetY: number): void;

  /**
   * 카메라 효과 파라미터 값을 설정합니다.
   * @param type 
   * @param param 
   */
  setCameraEffectParam(type: CameraEffectType, param: number): void;

  /**
   * 특정 키 값을 가진 오브젝트를 사라지게 합니다.
   * @param key 사라질 오브젝트의 키 값
   */
  disappearObject(key: string): void;
}
