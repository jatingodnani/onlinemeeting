import { SocketContext } from "@/context/socketprovider";
import { useRouter } from "next/router";

const { useState, useEffect, useRef, useContext } = require("react");

const usePeer = () => {
  const [peerHandler, setPeerHandler] = useState(null);
  const [peerId, setPeerId] = useState("");
  const ispeerref = useRef(false);
  const socket = useContext(SocketContext);
  const roomid = useRouter().query.roomid;

  useEffect(() => {
    if (ispeerref.current || !roomid || !socket) return;
    ispeerref.current = true;
    (async function ispeer() {
      const peerHandler = new (await import("peerjs")).default();
      setPeerHandler(peerHandler);

      peerHandler.on("open", (id) => {
        setPeerId(id);
        socket?.emit("join-room", roomid, id);
      });
    })();
  }, [roomid, socket]);

  return {
    peerHandler,
    peerId,
  };
};

export default usePeer;
