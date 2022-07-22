import { ScriptDynamicResource } from "./ScriptDynamicResource";
import { ScriptWidget } from "./ScriptWidget";

export class ScriptPlayer {
  /**
   * 플레이어 ID (Read Only)
   */
  readonly id: number;
  /**
   * 플레이어 이름
   */
	name: string;
  /**
   * 플레이어 이름 색상
   */
  nameColor: number;
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
   * 어택 타입(기본 : 1)
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
   * 플레이어에게 지정된 위치에 해당 text를 1초간 표시
   */
  showCenterLabel(
    text: string,
    color?: number,
    bgColor?: number,
    offset?: number
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
   */
  playSound(fileName: string, loop: boolean): void;

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
}
