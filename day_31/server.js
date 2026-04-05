import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer);
io.on("connection", (socket) => {
  console.log("new Connection created");
  socket.on("message", (msg) => {
    console.log("message event fired");
    console.log(msg);
    io.emit("message");
  });
});
httpServer.listen(4000, () => {
  console.log(`application is running at: http://localhost:4000`);
});
