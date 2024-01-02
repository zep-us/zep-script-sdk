import { ScriptDynamicResource } from "./ScriptDynamicResource";
import { ObjectEffectType } from "./ScriptObjectEffectType";

export {};

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

export type AppKeyObjectData = {
  key?: string,
  useDirAnim?: boolean,
  movespeed?: number,
  overlap?: boolean,
  collide?: boolean,
  npcProperty?: NpcProperty,
  offsetX?: number,
  offsetY?: number
}

export type NpcProperty = {
  name?:string;
  hp?: number;
  hpMax?: number;
  gaugeWidth?: number; 
  hpColor?: number;
}

export enum PutObjectType {
    STROKE= 1
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
      dynamicResource: ScriptDynamicResource,
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
        dynamicResource: ScriptDynamicResource,
        option?: AppKeyObjectData,
     ): void;

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
     */
     function moveObjectWithKey(
      key: string,
      targetX: number,
      targetY: number,
      path?: boolean
    ): void;

    /**
     * 해당 키 값을 가진 오브젝트의 정보를 가져옴
     * @param key 오브젝트의 키 값
     */
    function getObjectWithKey(
      key: string,
    ): object;

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
    ): [];

    /**
     * Type에 해당하는 오브젝트들을 리턴하는 함수
     * @param type 오브젝트의 타입 
     */
    function getObjectsByType(
      type: ObjectEffectType
    ): [];

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
    ): [];

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
        tileArray: Array<Array<number>>, type: PutObjectType, dynamicResource: ScriptDynamicResource, option?: object
    ) : void
    
    /**
     *  key 값을 가진 오브젝트 위에 말풍선을 표시하는 함수입니다.
     */
    function sayObjectWithKey(
        key: string, message: string 
    ) : void

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
  }
}

