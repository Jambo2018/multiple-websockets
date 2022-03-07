interface CallBack {
    (event: object): void;
}
declare type wsObj = {
    [key: string]: any;
};
interface WsObject {
    ws: wsObj;
    open: (url: string, reconnectTimes: number, onopen: CallBack, onMessage: CallBack, onclose: CallBack, onerror: CallBack) => void;
    startWebsocket: (url: string, reconnectTimes: number, onopen: CallBack, onMessage: CallBack, onclose: CallBack, onerror: CallBack) => void;
    setCallBacks: (url: string, reconnectTimes: number, onopen: CallBack, onMessage: CallBack, onclose: CallBack, onerror: CallBack) => void;
    close: (url: string) => void;
    sendMessage: (url: string, info?: string) => void;
}
declare const WS: WsObject;
export default WS;
//# sourceMappingURL=index.d.ts.map