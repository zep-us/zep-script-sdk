import { ScriptDynamicResource } from "./ScriptDynamicResource";

export {};

export type TileEffectType =
  | "NONE"
  | "IMPASSABLE"
  | "SPAWN"
  | "PORTAL"
  | "PRIVATE_AREA"
  | "SPOTLIGHT"
  | "EMBED"
  | "LOCATION"
  | "AMBIENT_SOUND"
  | "TILE_EMBED"
  | "WEB_PORTAL"
  | "SPACE_PORTAL";

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
     */
    function putTileEffect(x: number, y: number, tileID: TileEffectType): void;

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
  }
}
