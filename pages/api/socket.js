import { Server } from "socket.io";
const SOCKET_PORT = 3001;
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    res.status(200).json({
      success: true,
      message: "Socket is already running",
      socket: `:${SOCKET_PORT}`,
    });
    return;
  }
  console.log("[SOCKET INITIALIZING]");
  const io = new Server({
    path: "/api/socket",
    addTrailingSlash: false,
    cors: { origin: "*" },
  }).listen(SOCKET_PORT);
  io.on("connection", (socket) => {
  
    socket?.on("join-room", (roomid, id) => {
      console.log("[JOIN-ROOM]");
      socket.join(roomid);
      socket.broadcast.to(roomid).emit("user-connected", id);
    });
    socket.on("disconnect", async () => {
      console.log("[DISCONNECT]");
    });
  });
  res.socket.server.io = io;
  res.status(201).json({
    success: true,
    message: "Socket is started",
    socket: `:${SOCKET_PORT}`,
  });
};

export default SocketHandler;
