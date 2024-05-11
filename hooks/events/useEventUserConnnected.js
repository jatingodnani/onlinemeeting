import { SocketContext } from "@/context/socketprovider";
import React, { useContext } from "react";
import useEffectStrict from "../useEffectStrict";

export default function useEventUserConnnected(
  peerHandler,
  stream,
  setAllStreamsInfo,
  status
) {
  const socket = useContext(SocketContext);
  useEffectStrict(() => {
    if (!socket || !peerHandler || !stream) return;
    function handleUserConnection(peerId) {
      const call = peerHandler.call(peerId, stream, {
        metadata: status,
      });
      call.on("stream", (incomingStreamUrl) => {
        setAllStreamsInfo((prev) => ({
          ...prev,
          [peerId]: {
            url: incomingStreamUrl,
            muted: true,
            playing: true,
          },
        }));
      });
    }
    socket.on("user-connected", handleUserConnection);
    return () => {
      socket.off("user-connected", handleUserConnection);
    };
  }, [socket, peerHandler, stream]);
}
