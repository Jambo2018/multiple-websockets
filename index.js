"use strict";
exports.__esModule = true;
var WS = (function () {
    var obj = {
        ws: {},
        /**
         * @param url websocket url
         * @param reconnectTimes
         * @param onopen
         * @param onMessage
         * @param onclose
         * @param onerror
         */
        open: function (url, reconnectTimes, onopen, onMessage, onclose, onerror) {
            if (reconnectTimes === void 0) { reconnectTimes = 1; }
            this.ws[url] = { maxReconnectTimes: reconnectTimes };
            this.startWebsocket(url, reconnectTimes, onopen, onMessage, onclose, onerror);
        },
        startWebsocket: function (url, reconnectTimes, onopen, onMessage, onclose, onerror) {
            var _this = this;
            if (reconnectTimes === void 0) { reconnectTimes = 1; }
            console.log("url", url, this.ws[url]);
            var maxReconnectTimes = this.ws[url].maxReconnectTimes;
            this.ws[url] = new WebSocket(url);
            this.ws[url].times = reconnectTimes;
            this.ws[url].maxReconnectTimes = maxReconnectTimes;
            this.ws[url].onopen = function (e) {
                _this.ws[url].times = _this.ws[url].maxReconnectTimes;
                onopen(e);
            };
            this.ws[url].onmessage = onMessage;
            this.ws[url].onclose = function (e) {
                if (_this.ws[url].times === 0)
                    onclose(e);
                else
                    _this.startWebsocket(url, _this.ws[url].times - 1, onopen, onMessage, onclose, onerror);
            };
            this.ws[url].onerror = function (e) {
                if (_this.ws[url].times === 0)
                    onerror(e);
            };
        },
        close: function (url) {
            if (this.ws && this.ws[url]) {
                this.ws[url].times = 0;
                this.ws[url].close();
            }
        },
        sendMessage: function (url, info) {
            if (this.ws && this.ws[url])
                this.ws[url].send(info);
        }
    };
    return obj;
})();
exports["default"] = WS;
