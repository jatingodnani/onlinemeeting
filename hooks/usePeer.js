import { SocketContext } from "@/context/socketprovider";
import { useRouter } from "next/router";
import useEffectStrict from "./useEffectStrict";

const { useState, useEffect, useRef, useContext } = require("react");

const usePeer = () => {
  const [peerHandler, setPeerHandler] = useState(null);
  const [peerId, setPeerId] = useState("");
  const socket = useContext(SocketContext);
  const roomid = useRouter().query.roomid;

  useEffectStrict(() => {
    if (!roomid || !socket) return;
    (async function ispeer() {
      const peerHandler = new (await import("peerjs")).default();
      setPeerHandler(peerHandler);

      peerHandler.on("open", (id) => {
        setPeerId(id);
        socket?.emit("join-room", roomid, id);
      });
    })();
    return () => {
      if (socket) {
        socket.emit("leave-chat");
        console.log("[PEER DISCONNECTED]");
      }
      if (peerHandler) peerHandler.destroy();
    };
  }, [roomid, socket]);

  return {
    peerHandler,
    peerId,
  };
};

export default usePeer;
