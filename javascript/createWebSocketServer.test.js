import WebSocket from "ws";
import http from "http";
import { startServer, waitForSocketState } from "./webSocketTestUtils";

const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
  let server = http.createServer();

  beforeAll(async () => {
    server = await startServer(port, server);
  });

  afterAll(() => server.close());

  test("Subscribe test", async () => {
    // Create test client
    const client = new WebSocket(`ws://localhost:${port}`);
    await waitForSocketState(client, client.OPEN);

    const testJson = { type: "Subscribe" };
    let responseMessage;

    client.on("message", (data) => {
      responseMessage = JSON.parse(data);

      client.close();
    });

    client.send(JSON.stringify(testJson));

    const expected = { ...testJson, status: "Subscribed" };

    await waitForSocketState(client, client.CLOSED);
    expect({ type: "Subscribe", status: "Subscribed" }).toMatchObject(expected);
  });

  test("Unsubscribe test", async () => {
    const client = new WebSocket(`ws://localhost:${port}`);
    await waitForSocketState(client, client.OPEN);

    const testJson = { type: "Unsubscribe" };
    let responseMessage;

    client.on("message", (data) => {
      responseMessage = JSON.parse(data);

      client.close();
    });

    client.send(JSON.stringify(testJson));

    const expected = { ...testJson, status: "Unsubscribed" };

    await waitForSocketState(client, client.CLOSED);
    expect({
      type: responseMessage.type,
      status: responseMessage.status,
    }).toMatchObject(expected);
  });

  test("Method not implemented test", async () => {
    const client = new WebSocket(`ws://localhost:${port}`);
    await waitForSocketState(client, client.OPEN);

    const testJson = { type: "NotImplemented" };
    let responseMessage;

    client.on("message", (data) => {
      responseMessage = JSON.parse(data);

      client.close();
    });

    client.send(JSON.stringify(testJson));

    const expected = { type: "Error", status: "Requested method not implemented" };

    await waitForSocketState(client, client.CLOSED);
    expect({
      type: responseMessage.type,
      status: responseMessage.status,
    }).toMatchObject(expected);
  });

  test("Bad format test", async () => {
    const client = new WebSocket(`ws://localhost:${port}`);
    await waitForSocketState(client, client.OPEN);

    const testJson = "BadFormat";
    let responseMessage;

    client.on("message", (data) => {
      responseMessage = JSON.parse(data);

      client.close();
    });

    client.send(JSON.stringify(testJson));

    const expected = { type: "Error", status: "Bad formatted payload, non JSON" };

    await waitForSocketState(client, client.CLOSED);
    expect({
      type: responseMessage.type,
      status: responseMessage.status,
    }).toMatchObject(expected);
  });
});
