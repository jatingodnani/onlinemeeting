import React, { useContext } from "react";
import useEffectStrict from "../useEffectStrict";
import { SocketContext } from "@/context/socketprovider";

export default function useEventUpdateOtherUser(setAllStreamsInfo, status) {
  const socket = useContext(SocketContext);
  useEffectStrict(() => {
    if (!socket) return;
    function handleUpdateOtherUser(peerId, status) {
      console.log("[UPDATE-OTHER-USER]");
      setAllStreamsInfo((prev) => ({
        ...prev,
        [peerId]: {
          ...prev[peerId],
          muted: status.muted,
          playing: status.playing,
        },
      }));
    }

    socket.on("update-other-user", handleUpdateOtherUser);
    return () => {
      socket.off("update-other-user", handleUpdateOtherUser);
    };
  }, [status, socket]);
}
