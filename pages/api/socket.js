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
  console.log("[SOCKET INITIALIZING 🟡]");
  const io = new Server({
    path: "/api/socket",
    addTrailingSlash: false,
    cors: { origin: "*" },
  }).listen(SOCKET_PORT);

  // Connection
  io.on("connection", (socket) => {
  
    console.log("[CONNECTION]");

    // Join-room
    socket?.on("join-room", (roomid, id) => {
      console.log("[JOIN-ROOM]");
      socket.join(roomid);
      socket.broadcast.to(roomid).emit("user-connected", id);
    });

    // Update User
    socket.on("update-user", (id, roomid, status) => {
      console.log("[UPDATE-USER]");
      socket.broadcast.to(roomid).emit("update-other-user", id, status);
    });
    // Update User
    socket.on("leave-chat", (id, roomid) => {
      console.log("[Leave-chat]");
      socket.broadcast.to(roomid).emit("left-chat", id);
    });

    // Disconnection
    socket.on("disconnect", () => {
      console.log("[DISCONNECT]");
    });
  });

  console.log("[SOCKET STARTED 👍]");
  res.socket.server.io = io;
  res.status(201).json({
    success: true,
    message: "Socket is started",
    socket: `:${SOCKET_PORT}`,
  });
};

export default SocketHandler;
