interface CallBack {
    (event: object): void
}
type wsObj = {
    [key: string]: any
}
interface WsObject {
    ws: wsObj,
    open: (url: string, reconnectTimes: number, onopen: CallBack, onMessage: CallBack, onclose: CallBack, onerror: CallBack) => void,
    startWebsocket: (url: string, reconnectTimes: number, onopen: CallBack, onMessage: CallBack, onclose: CallBack, onerror: CallBack) => void,
    close: (url: string) => void,
    sendMessage: (url: string, info?: string) => void,
}
const WS: WsObject = (function (): WsObject {
    let obj: WsObject = {
        ws: {},
        /**
         * @param url websocket url
         * @param reconnectTimes 
         * @param onopen 
         * @param onMessage 
         * @param onclose 
         * @param onerror 
         */
        open: function (url: string, reconnectTimes: number = 1, onopen: CallBack, onMessage: CallBack, onclose: CallBack, onerror: CallBack): void {
            if (this.ws && !this.ws[url].isrunning) return;
            this.ws[url] = { maxReconnectTimes: reconnectTimes };
            this.startWebsocket(url, reconnectTimes, onopen, onMessage, onclose, onerror);
        },
        startWebsocket: function (url: string, reconnectTimes: number = 1, onopen: CallBack, onMessage: CallBack, onclose: CallBack, onerror: CallBack) {
            console.log("url", url, this.ws[url])
            const { maxReconnectTimes } = this.ws[url];
            this.ws[url] = new WebSocket(url);
            this.ws[url].times = reconnectTimes;
            this.ws[url].maxReconnectTimes = maxReconnectTimes;
            this.ws[url].onopen = (e: object) => {
                this.ws[url].times = this.ws[url].maxReconnectTimes;
                this.ws[url].isrunning = true;
                onopen(e);
            };
            this.ws[url].onmessage = e => {
                this.ws[url].isrunning = true;
                e => onMessage(e)
            };
            this.ws[url].onclose = (e: object) => {
                this.ws[url].isrunning = false;
                if (this.ws[url].times === 0)
                    onclose(e)
                else
                    this.startWebsocket(url, this.ws[url].times - 1, onopen, onMessage, onclose, onerror);
            };
            this.ws[url].onerror = (e: object) => {
                this.ws[url].isrunning = false;
                if (this.ws[url].times === 0)
                    onerror(e)
            };
        },
        close: function (url) {
            if (this.ws && this.ws[url]) {
                this.ws[url].times = 0
                this.ws[url].close();
            }
        },
        sendMessage: function (url, info?: string) {
            if (this.ws && this.ws[url])
                this.ws[url].send(info);
        }
    }
    return obj;
})();


export default WS;


