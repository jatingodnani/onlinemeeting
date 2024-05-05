import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const SOCKET_PORT = 3001;
export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  useEffect(() => {
    const connection = io(`:${SOCKET_PORT}`, {
      path: "/api/socket",
      addTrailingSlash: false,
    });
    setsocket(connection);
  }, []);
  socket?.on("connect", () => {
    console.log("[socket initialized]");
  });

  socket?.on("connect_error", async (err) => {
    console.log(`connect_error due to ${err.message}`);
    await fetch("/api/socket");
  });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
