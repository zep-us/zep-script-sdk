import { ScriptDynamicResource } from "./ScriptDynamicResource";
import { ObjectEffectType } from "./ScriptObjectEffectType";

export {};

/**
 * 타일 효과 유형을 나타내는 열거형입니다.
 */
export enum TileEffectType {
  NONE = 0,
  IMPASSABLE = 1,
  SPAWN = 2,
  PORTAL = 3,
  PRIVATE_AREA = 4,
  SPOTLIGHT = 5,
  EMBED = 6,
  LOCATION = 7,
  AMBIENT_SOUND = 8,
  TILE_EMBED = 9,
  WEB_PORTAL = 10,
  SPACE_PORTAL = 11
}

/**
 * 애플리케이션 키 오브젝트 데이터를 나타내는 타입입니다.
 */
export type AppKeyObjectData = {
  /**
   * 오브젝트의 타입입니다.
   */
  type?: ObjectEffectType | number;
  
  /**
   * 오브젝트의 키 값입니다.
   */
  key?: string;

  /**
   * 방향 애니메이션 사용 여부입니다.
   * 기본 값 false
   */
  useDirAnim?: boolean;

  /**
   * true 이면 통과 불가능 오브젝트로 설정됩니다.
   */
  impassable?: boolean;

  /**
   * 오브젝트의 이동 속도입니다.
   * 기본 값 80
   */
  movespeed?: number;

  /**
   * 겹침 여부입니다.
   * 기본 값 false
   */
  overlap?: boolean;

  /**
   * 충돌 여부입니다.
   * 기본 값 false
   */
  collide?: boolean;

  /**
   * NPC 속성입니다.
   */
  npcProperty: NpcProperty;

  /**
   * X 축 오프셋 값입니다.
   */
  offsetX?: number;

  /**
   * Y 축 오프셋 값입니다.
   */
  offsetY?: number;

  /**
   * 오브젝트가 활성화될 수 있는 거리입니다. 유저가 이 거리 내에 있을 때 오브젝트가 트리거될 수 있습니다.
   * 기본 값 1
   */
  activeDistance?: number;

  /**
   * false이면 사용자가 F 키를 눌렀을 때만 트리거되고, true이면 유저가 activeDistance 내에 있으면 자동으로 트리거됩니다.
   * 기본 값 false
   */
  triggerByTouch?: boolean;

}

/**
 * NPC 속성을 나타내는 타입입니다.
 */
export type NpcProperty = {
  /**
   * 이름입니다.
   */
  name?: string;

  /**
   * 현재 HP 값입니다.
   */
  hp?: number;

  /**
   * 최대 HP 값입니다.
   */
  hpMax?: number;

  /**
   * 게이지 너비입니다.
   */
  gaugeWidth?: number;

  /**
   * HP 색상입니다.
   */
  hpColor?: number;
}

/**
 * 오브젝트 배치 유형을 나타내는 열거형입니다.
 */
export enum PutObjectType {
  STROKE = 1
}

/**
 * 위치 정보를 나타내는 타입입니다.
 */
export type LocationInfo = {
  /**
   * X 좌표입니다.
   */
  x: number;

  /**
   * Y 좌표입니다.
   */
  y: number;

  /**
   * 너비 값입니다.
   */
  width: number;

  /**
   * 높이 값입니다.
   */
  height: number;

  /**
   * 라벨입니다.
   */
  label: string;
}

type MapDataTileObject = {
  /**
   * 인덱스 값입니다.
   */
  index: number;

  /**
   * 깊이 값입니다.
   */
  depth: number;

  /**
   * 동적 리소스 ID입니다.
   */
  dynamicResourceId: number;

  /**
   * 겹침 감지 여부를 나타냅니다.
   */
  overlap: boolean;

  /**
   * 충돌 감지 여부를 나타냅니다.
   */
  collide: boolean;

  /**
   * 상단 오브젝트 여부를 나타냅니다.
   */
  topObject: boolean;

  /**
   * X 축 오프셋 값입니다.
   */
  offsetX: number;

  /**
   * Y 축 오프셋 값입니다.
   */
  offsetY: number;

  /**
   * 회전 값입니다.
   */
  rotation: number;

  /**
   * 통과 불가 여부를 나타냅니다.
   */
  impassable: boolean;

  /**
   * 활성화 거리입니다. 기본값은 1입니다.
   */
  activeDistance: number;

  /**
   * 기능 유형입니다.
   */
  type: number;

  /**
   * 텍스트입니다.
   */
  text: string;

  /**
   * 툴팁입니다.
   */
  tooltip: string;

  /**
   * 비밀 텍스트입니다.
   */
  secret: string;

  /**
   * 링크입니다.
   */
  link: string;

  /**
   * 표시할 이미지 이름입니다.
   */
  showImageName: string;

  /**
   * 하위 유형입니다.
   */
  subType: number;

  /**
   * 하위 텍스트입니다.
   */
  subText: string;

  /**
   * 터치 시 트리거 여부를 나타냅니다.
   */
  triggerByTouch: boolean;

  /**
   * 선택적 매개변수 1입니다.
   */
  param1: string;

  /**
   * 선택적 매개변수 2입니다.
   */
  param2: string;

  /**
   * 선택적 매개변수 3입니다.
   */
  param3: string;

  /**
   * 선택적 매개변수 4입니다.
   */
  param4: string;

  /**
   * 오브젝트 이름 숨김 여부를 나타냅니다.
   */
  isHideObjectName: boolean;
}

type MapDataTileAppObject = MapDataTileObject & {
  /**
   * X 좌표
   */
  tileX: number;

  /**
   * Y 좌표
   */
  tileY: number;

  /**
   * 오브젝트의 키 값입니다.
   */
  key: string;

  /**
   * 오브젝트의 이동 속도입니다.
   */
  moveSpeed: number;

  /**
   * 방향 애니메이션 사용 여부를 나타냅니다.
   */
  useDirAnim: boolean;
}

/**
 * NPC 속성을 포함하는 오브젝트 타입입니다.
 */
type NpcObject = MapDataTileAppObject & {
  /**
   * NPC 속성입니다.
   */
  npcProperty: NpcProperty;

  /**
   * 업데이트된 정보를 전송하는 함수입니다.
   */
  sendUpdated: () => void;
}


declare global {
  namespace ScriptMap {
    /**
     * 맵의 너비 (가로 사이즈) (Read Only)
     */
    const width: number;

    /**
     * 맵의 높이 (세로 사이즈) (Read Only)
     */
    const height: number;

    /**
     * 맵 이름 (Read Only)
     */
    const name: string;

    /**
     * 지정된 좌표에 타일효과를 적용
     * @param x X 좌표
     * @param y Y 좌표
     * @param tileID 타일에 적용할 효과
     * @param option 타일 효과 옵션
     */
    function putTileEffect(x: number, y: number, tileID: TileEffectType, option?: object): void;

    /**
     * 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
     * @param x X 좌표
     * @param y Y 좌표
     * @param dynamicResource `App.loadSpritesheet()` 함수를 통해 사전에 로드한 이미지 파일 객체
     * @param data
     */
    function putObject(
      x: number,
      y: number,
      dynamicResource: ScriptDynamicResource | null,
      data?: any
    ): Promise<void>;

    /**
     * 지정한 좌표에 키 값을 가진 오브젝트를 놓음 (기준 좌표 : Left-Top)
     * @param x X 좌표
     * @param y Y 좌표
     * @param dynamicResource `App.loadSpritesheet()` 함수를 통해 사전에 로드한 이미지 파일 객체
     * @param option
     */
     function putObjectWithKey(
        x: number,
        y: number,
        dynamicResource: ScriptDynamicResource | null,
        option?: Omit<AppKeyObjectData, "npcProperty">,
     ): MapDataTileAppObject;

    function putObjectWithKey(
        x: number,
        y: number,
        dynamicResource: ScriptDynamicResource | null,
        option?: AppKeyObjectData,
    ): NpcObject;

    /**
     * 해당 좌표에 있는 오브젝트의 스프라이트 애니메이션을 실행시킴 (putObject가 선행되어야 함)
     * @param x X 좌표
     * @param y Y 좌표
     * @param name 애니메이션이 실행될 스프라이트 객체의 고유한 키값
     * @param loop 애니메이션을 반복시킬 횟수 지정
     */
    function playObjectAnimation(
      x: number,
      y: number,
      name: string,
      loop: number
    ): void;

    /**
     * ZEP 스크립트로 생성된 모든 오브젝트를 제거
     */
    function clearAllObjects(): void;

    /**
     * 해당 좌표의 오브젝트를 타겟 좌표로 time(초) 동안 이동
     * @param x X 좌표
     * @param y Y 좌표
     * @param targetX 목표가 되는 X 좌표
     * @param targetY 목표가 되는 Y 좌표
     * @param time 시간
     */
    function moveObject(
      x: number,
      y: number,
      targetX: number,
      targetY: number,
      time: number
    ): void;

    /**
     * key 값을 가진 오브젝트를 타겟 좌표로 이동
     * @param key 오브젝트의 키 값
     * @param targetX 목표가 되는 X 좌표
     * @param targetY 목표가 되는 Y 좌표
     * @param usePath true일 경우 Impassable 타일을 통과하지 못합니다.(default: true)
     */
     function moveObjectWithKey(
      key: string,
      targetX: number,
      targetY: number,
      usePath?: boolean
    ): boolean;

    /**
     * 해당 키 값을 가진 오브젝트의 정보를 가져옴
     * @param key 오브젝트의 키 값
     */
    function getObjectWithKey(
      key: string,
    ): NpcObject;

    /**
     * 해당하는 레이어의 x, y 좌표에 있는 타일의 타입 값을 리턴, 타일이 없으면 -1을 리턴합니다.
     * @param layer 레이어에 해당하는 값 0 = Floor, 1 = WALL,2 = TileEffect, 3 = Object, 5 = TopObject,
     * @param x X 좌표
     * @param y Y 좌표
     */
    function getTile(
      layer: number,
      x: number, 
      y: number
    ): number;

    /**
     * Type에 해당하는 상단오브젝트들을 리턴하는 함수
     * @param type 오브젝트의 타입 
     */
    function getTopObjectsByType(
      type: ObjectEffectType
    ): MapDataTileObject[];

    /**
     * Type에 해당하는 오브젝트들을 리턴하는 함수
     * @param type 오브젝트의 타입 
     */
    function getObjectsByType(
      type: ObjectEffectType
    ): MapDataTileObject[];

    /**
     * key 값이 일치하는 오브젝트의 스프라이트 애니메이션을 실행시키는 함수
     * @param key 오브젝트의 키값
     * @param animName 플레이할 애니메이션의 이름
     * @param repeatCount 애니메이션 반복 횟수 ( -1 입력시 무한반복 )
     */
    function playObjectAnimationWithKey(
      key: string, 
      animName: string, 
      repeatCount: number
    ): void;

    /**
     * 맵에 해당 로케이션이 있는지 체크하여 true/false 값을 리턴합니다.
     * @param locationName 로케이션 이름
     */
    function hasLocation(
      locationName: string
    ): boolean;
    
    /**
     * 오브젝트를 배치할 좌표들을 2차원 배열로 입력하여 한 번에 오브젝트를 설치하는 기능입니다. 이 기능을 사용하면 한 번에 많은 오브젝트를 설치할 경우 부하를 줄이는 효과를 얻을 수 있습니다.
     */
    function putObjectMultiple(
        tileArray: Array<Array<number>>, type: PutObjectType, dynamicResource: ScriptDynamicResource | null, option?: object
    ) : void
    
    /**
     *  key 값을 가진 오브젝트 위에 말풍선을 표시하는 함수입니다.
     */
    function sayObjectWithKey(
        key: string, message: string 
    ) : boolean

    /**
     *  파라미터로 전달한 로케이션이 존재하는 경우, 로케이션 설치 좌표를 리턴합니다.
     *  @param locationName 로케이션 이름
     */
    function getLocation(
        locationName: string
    ) : { x: number, y: number }

    /**
     *  파라미터로 전달한 로케이션이 2개이상 존재하는 경우,무작위로 선택하여 해당 로케이션의 설치 좌표를 리턴합니다.
     *  @param locationName 로케이션 이름
     */
    function getLocationRandom(
        locationName: string
    ) : { x: number, y: number }

    /**
     * 주어진 위치 이름을 기반으로 위치 정보 목록을 반환합니다.
     * @param locationName 위치 이름
     * @returns LocationInfo 배열
     */
    function getLocationList(locationName: string): LocationInfo[]
  }
}

