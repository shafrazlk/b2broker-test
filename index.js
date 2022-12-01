import express from "express";

import * as path from "path";

const app = express();
const __dirname = path.dirname("./");

app.use(express.static(path.join(__dirname, "/public")));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

import { startServer } from "./javascript/webSocketTestUtils.js";

startServer(8081, app);
