import useEffectStrict from "@/hooks/useEffectStrict";
import React, { createContext, useState } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);

  useEffectStrict(() => {
    const connection = io();
    setsocket(connection);
  });

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
