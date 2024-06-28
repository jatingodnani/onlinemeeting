import { SocketContext } from "@/context/socketprovider";
import { useRouter } from "next/router";
import useEffectStrict from "./useEffectStrict";

const { useState, useEffect, useContext } = require("react");

const usePeer = () => {
  const [peerHandler, setPeerHandler] = useState(null);
  const [peerId, setPeerId] = useState("");
  const socket = useContext(SocketContext);
  const roomid = useRouter().query.roomid;

  useEffectStrict(() => {
    if (!roomid || !socket) return;

    const initPeer = async () => {
      const Peer = (await import("peerjs")).default;

      // Configuration without ICE servers for strict P2P
      const peerHandler = new Peer({
        config: {
          iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
              ],
            },
            { urls: "stun:stun.relay.metered.ca:80" },
            {
              urls: "turn:global.relay.metered.ca:80",
              username: "69038efa52c3f063080276fd",
              credential: "IXOUMW1pCf43N5jC",
            },
            {
              urls: "turn:global.relay.metered.ca:80?transport=tcp",
              username: "69038efa52c3f063080276fd",
              credential: "IXOUMW1pCf43N5jC",
            },
            {
              urls: "turn:global.relay.metered.ca:443",
              username: "69038efa52c3f063080276fd",
              credential: "IXOUMW1pCf43N5jC",
            },
            {
              urls: "turns:global.relay.metered.ca:443?transport=tcp",
              username: "69038efa52c3f063080276fd",
              credential: "IXOUMW1pCf43N5jC",
            },
          ],
        },
      });

      peerHandler.on("open", (id) => {
        setPeerId(id);
        socket?.emit("join-room", roomid, id);
      });

      peerHandler.on("error", (err) => {
        console.error("PeerJS Error:", err);
      });

      setPeerHandler(peerHandler);
    };

    if (typeof window !== "undefined") {
      initPeer();
    }

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
