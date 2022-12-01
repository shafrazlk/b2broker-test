import WebSocket from "ws";

import SubscribeManager from "../subscribeManager.js";
const subscribeManager = new SubscribeManager();

function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function (ws) {
    ws.on("message", function (payload) {
      const json = JSON.parse(payload);
      // ws.send(json);

      if (json.type) {
        switch (json.type) {
          case "Subscribe":
            subscribeManager.subscribe(ws, json.type);
            break;
          case "Unsubscribe":
            subscribeManager.unsubscribe(ws, json.type);
            break;
          case "CountSubscribers":
            subscribeManager.subscriberCount(ws, json.type);
            break;
          default:
            ws.send(
              JSON.stringify({
                type: "Error",
                status: "Requested method not implemented",
                updatedAt: Date.now(),
              })
            );
            break;
        }
      } else {
        ws.send(
          JSON.stringify({
            type: "Error",
            status: "Bad formatted payload, non JSON",
            updatedAt: Date.now(),
          })
        );
      }
    });
  });
}

export default createWebSocketServer;
