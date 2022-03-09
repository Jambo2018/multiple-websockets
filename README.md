# [multiple-websockets](https://github.com/Jambo2018/multiple-websockets)   [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJambo2018%2Fmultiple-websockets.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FJambo2018%2Fmultiple-websockets?ref=badge_shield)

a React Component or Hook which allow multiple websocket connections.
## Install

```
$ npm i multiple-websockets --save
or
$ yarn add
```

## Example

```javascript
import { Component } from "react";
import { Websocket as ws, useWebsocket } from "multiple-websockets";

const wsUrl = "ws://localhost:8001";
class Com1 extends Component {
  openCB = (e) => {};    //open callback
  messageCB = (e) => {}; //message callback
  closeCB = (e) => {};    //close callback
  errorCB = (e) => {};    //error callback

  open = function () {
    ws.open(wsUrl,5,this.openCB,this.messageCB,this.closeCB,this.errorCB);
  };
  send = function () {
    ws.sendMessage(wsUrl, "test123");
  };
  close = function () {
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
      <Com1 />
      <Com2 />
    </>
  );
}
```

## Lisctens
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJambo2018%2Fmultiple-websockets.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FJambo2018%2Fmultiple-websockets?ref=badge_large)
