export enum DateType {
    MILLISECONDS,
    SECONDS ,
    MINUTES ,
    HOURS ,
    DAYS ,
}

declare global {
    namespace Time {
        /**
         * ZEP 서버의 현재 시간을 milliseconds 단위의 값으로 리턴합니다.
         */
        function getTime():number;

        /**
         * 현재 UTC 시간을 milliseconds 단위의 값으로 리턴합니다.
         */
        function getUtcTime():number;


        /**
         * timeB - timeA를 계산하고, 그 결과를 지정한 returnType으로 반환합니다.
         *
         * @param timeA 차이를 계산할 시간 (milliseconds)
         * @param timeB 차이를 계산할 시간 (milliseconds)
         * @param returnType DateType.MILLISECONDS ( ms 단위 ), DateType.SECONDS (초 단위 ), DateType.MINUTES ( 분 단위 ), DateType.HOURS ( 시간 단위 ), DateType.DAYS ( 일 단위 )
         */
        function getTimeInterval(timeA: number, timeB: number, returnType: DateType) : number;
    }
}