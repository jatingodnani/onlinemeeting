import useEffectStrict from "@/hooks/useEffectStrict";
import React, { createContext, useState } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext(null);
const SOCKET_URL = process.env.AWS_EC2_SOCKET_URL;
const SocketProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);

  useEffectStrict(() => {
    // const connection = io("https://bpxff8fg-3001.inc1.devtunnels.ms/");
    const connection = io("http://localhost:3001/");
    setsocket(connection);
  });

  socket?.on("connect", () => {
    console.log("[socket initialized]");
  });

  // socket?.on("connect_error", async (err) => {
  //   console.log(`connect_error due to ${err.message}`);
  //   await fetch("/api/socket");
  // });

  socket?.on("connect_error", (error) => {
    console.error("Connection Error:", error);
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
