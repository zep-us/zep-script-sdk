import { ScriptPlayer } from "./ScriptPlayer";

/**
 * HTML 위젯과 ZEP Script 앱 사이의 메시지 통신을 담당하는 객체입니다.
 *
 * @template TMessage `sendMessage()`로 보내거나 `onMessage`로 받는 payload 타입입니다.
 * 지정하지 않으면 기존 코드와의 호환성을 위해 `any`로 동작합니다.
 */
export class ScriptWidget<TMessage = any> {
  /**
   * 위젯 아이디값
   */
  id: number;

  /**
   * 위젯에서 앱으로 보낸 메시지를 받을 리스너를 등록합니다.
   */
  onMessage: {
    /**
     * 위젯 메시지를 처리할 콜백을 등록합니다.
     *
     * @param callback 메시지를 보낸 플레이어와 payload를 받는 콜백
     */
    Add: (callback: (sender: ScriptPlayer, data: TMessage) => void) => void;
  };

  /**
   * 생성한 위젯으로 메시지를 보냅니다.
   *
   * @param object 위젯으로 전달할 payload
   */
  sendMessage: (object: TMessage) => void;

  /**
   * 위젯을 제거합니다.
   */
  destroy: () => boolean;
}
