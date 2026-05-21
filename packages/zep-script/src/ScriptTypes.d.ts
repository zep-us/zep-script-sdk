/**
 * 위젯 또는 임베드 화면을 표시할 수 있는 위치입니다.
 *
 * `popup`은 위젯에서만 사용할 수 있으며, `ScriptPlayer.showEmbed()`에는 사용할 수 없습니다.
 */
export type WidgetAlign =
  | "popup"
  | "sidebar"
  | "top"
  | "topleft"
  | "topright"
  | "middle"
  | "middleleft"
  | "middleright"
  | "bottom"
  | "bottomleft"
  | "bottomright";

/**
 * URL 임베드 화면을 표시할 수 있는 위치입니다.
 *
 * 임베드는 팝업 위치를 지원하지 않으므로 `WidgetAlign`에서 `popup`을 제외합니다.
 */
export type EmbedAlign = Exclude<WidgetAlign, "popup"> | "fullscreen";

/**
 * JSON으로 직렬화할 수 있는 원시 값입니다.
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * JSON으로 직렬화할 수 있는 값입니다.
 *
 * HTTP JSON 요청 body와 위젯 메시지 payload처럼 구조화된 데이터를 전달할 때 사용합니다.
 */
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

/**
 * 문자열 키를 가진 JSON 객체입니다.
 */
export type JsonObject = {
  [key: string]: JsonValue;
};

/**
 * HTTP header 값으로 전달할 수 있는 타입입니다.
 */
export type HttpHeaderValue = string | number | boolean;

/**
 * `ScriptApp.httpGet()`, `ScriptApp.httpPost()`, `ScriptApp.httpPostJson()`에 전달하는 HTTP header 객체입니다.
 */
export type HttpHeaders = Record<string, HttpHeaderValue>;

/**
 * HTTP 요청에 전달할 수 있는 payload 타입입니다.
 *
 * `JsonValue`처럼 JSON으로 직렬화 가능한 값을 권장하지만, 기존 스크립트 앱에서
 * `data: object` 형태의 payload를 자주 사용하므로 HTTP API에서는 일반 객체도 허용합니다.
 */
export type HttpRequestPayload = JsonValue | object;

/**
 * 위젯과 앱 사이에서 주고받는 기본 메시지 payload 타입입니다.
 *
 * 더 정확한 payload 타입이 필요하면 `ScriptWidget<TMessage>` 또는
 * `ScriptApp.showWidget<TMessage>()`의 타입 인자로 직접 지정할 수 있습니다.
 */
export type WidgetMessage = JsonValue;
