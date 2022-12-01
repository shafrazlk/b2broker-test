import http from "http";
import createWebSocketServer from "./createWebSocketServer.js";

function startServer(port, server) {
  // const server = http.createServer();
  createWebSocketServer(server);

  // server.get("/", (req, res) => {
  //   res.send("Hello World!");
  // });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
      resolve(server);
    });
  });
}

function waitForSocketState(socket, state) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (socket.readyState === state) {
        resolve();
      } else {
        waitForSocketState(socket, state).then(resolve);
      }
    });
  });
}

export { startServer, waitForSocketState };
