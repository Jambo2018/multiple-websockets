# [multiple-websockets](https://github.com/Jambo2018/multiple-websockets) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJambo2018%2Fmultiple-websockets.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FJambo2018%2Fmultiple-websockets?ref=badge_shield)   [![install size](https://packagephobia.com/badge?p=multiple-websockets)](https://packagephobia.com/result?p=multiple-websockets)

a React Component or Hook which allow multiple websocket connections.

- Always keep one communication when repeatly open the same websocket url
- Allow multiple communication when open the different urls
- Supports multiple pages/components processing the communication with the same url

## Install

```
$ npm i multiple-websockets --save
or
$ yarn add multiple-websockets
```

## Example

```javascript
import { Component,useEffect } from "react";
import { WebSocket as ws, useWebsocket } from "multiple-websockets";

const wsUrl = "ws://localhost:8001";
class Com1 extends Component {
  //open callback
  openCB = (e) => {};
  //message callback
  messageCB = (e) => {};
  //close callback
  closeCB = (e) => {};
  //error callback
  errorCB = (e) => {};

  open = () => {
    ws.open(wsUrl, 5, this.openCB, this.messageCB, this.closeCB, this.errorCB);
  };
  send = () => {
    ws.sendMessage(wsUrl, "test123");
  };
  close = () => {
    ws.close(wsUrl);
  };

  render() {
    return (
      <>
        <button onClick={this.open}>open</button>
        <button onClick={this.send}>send</button>
        <button onClick={this.close}>close</button>
      </>
    );
  }
}

function Com2() {
  const [message, open, send, close] = useWebsocket(wsUrl, 5);
  useEffect(() => {
    // message
  }, [message]);
  return (
    <>
      <button onClick={open}>open</button>
      <button onClick={send}>send</button>
      <button onClick={close}>close</button>
    </>
  );
}

function App() {
  return (
    <>
      <h1>class</h1>
      <Com1 />
      <h1>hook</h1>
      <Com2 />
    </>
  );
}
```

## Lisctens

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJambo2018%2Fmultiple-websockets.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FJambo2018%2Fmultiple-websockets?ref=badge_large)

