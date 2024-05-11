const { Server } = require("socket.io");
const SOCKET_PORT = 3001;
const PEER_ID = {};
const ROOM_ID = {};
const addToRoom = (roomid, id, peerid) => {
  if (!PEER_ID[roomid]) PEER_ID[roomid] = {};
  PEER_ID[roomid][id] = peerid;
  ROOM_ID[id] = roomid;
};
const removeFromRoom = (id) => {
  const roomid = ROOM_ID[id];
  if (!roomid) return {};
  const peerid = PEER_ID[roomid][id];
  delete ROOM_ID[id];
  delete PEER_ID[roomid][id];
  return { roomid, peerid };
};

const io = new Server(SOCKET_PORT, {
  cors: {
    origin: "*",
  },
});
// Connection
io.on("connection", (socket) => {
  console.log("[CONNECTION]");

  // Join-room
  socket?.on("join-room", (roomid, peerid) => {
    console.log("[JOIN-ROOM]");
    addToRoom(roomid, socket.id, peerid);
    socket.join(roomid);
    socket.broadcast.to(roomid).emit("user-connected", peerid);
  });

  // Update User
  socket.on("update-user", (id, roomid, status) => {
    console.log("[UPDATE-USER]");
    socket.broadcast.to(roomid).emit("update-other-user", id, status);
  });

  // User Disconnected
  socket.on("leave-chat", () => {
    console.log("[Leave-chat]");
    const userInfo = removeFromRoom(socket.id);
    console.log(userInfo);
    if (!userInfo?.roomid || !userInfo?.peerid) return;
    socket.leave(userInfo.roomid);
    socket.broadcast.to(userInfo.roomid).emit("left-chat", userInfo.peerid);
  });

  // Disconnection
  socket.on("disconnect", () => {
    console.log("[DISCONNECT]");
    const userInfo = removeFromRoom(socket.id);
    console.log(userInfo);
    if (!userInfo?.roomid || !userInfo?.peerid) return;
    socket.leave(userInfo.roomid);
    socket.broadcast.to(userInfo.roomid).emit("left-chat", userInfo.peerid);
  });
});
