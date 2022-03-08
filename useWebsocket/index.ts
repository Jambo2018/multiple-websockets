import ws from "../websocket";
import { useEffect, useRef, useState } from "react";
export default function useWebsocket(url:string, times:number) {
    const ref = useRef(null);
    const [closed, setClose] = useState(true);
    const [message, setMessage] = useState({});
    useEffect(() => {
        return () => { ref.current = true; }
    }, [])
    useEffect(() => {
        if (!closed) {
            ws.open(url, times, function (event) {
                if (!ref.current)
                    setMessage(event)
            }, function (event) {
                if (!ref.current)
                    setMessage(event)
            }, function (event) {
                if (!ref.current)
                    setMessage(event)
            }, function (event) {
                if (!ref.current)
                    setMessage(event)
            });
        }
        // return () => { ws.close(url) };
    }, [closed])

    const open = () => { ref.current = false; setClose(false); };
    const send = (e:string) => { ws.sendMessage(url, e) };
    const close = () => { ws.close(url);setClose(true); };
    return [message, open, send, close];
}