import { ScriptPlayer } from "./ScriptPlayer";

export class ScriptWidget {
  /**
   * 위젯 아이디값
   */
  id: number;

  /**
   * 위젯에 리스너 콜백을 등록
   */
  onMessage: {
    Add: (callback: (sender: ScriptPlayer, data: any) => void) => void;
  };

  /**
   * 생성한 위젯에 메세지를 보냄
   */
  sendMessage: (object: any) => void;

  /**
   * 위젯을 제거
   */
  destroy: () => void;
}
