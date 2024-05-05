import React, { useContext } from "react";
import useEffectStrict from "../useEffectStrict";
import { cloneDeep } from "lodash";
import { SocketContext } from "@/context/socketprovider";

export default function useEventLeftChat(setAllStreamsInfo, peerId) {
  const socket = useContext(SocketContext);
  useEffectStrict(() => {
    if (!socket || !peerId) return;
    function handleDisconnection(id) {
      setAllStreamsInfo((prev) => {
        let newState = cloneDeep(prev);
        if (newState[id]) delete newState[id];
        return { ...newState };
      });
    }
    socket.on("left-chat", handleDisconnection);
    return () => {
      socket.off("left-chat", handleDisconnection);
    };
  }, [socket, peerId]);
}
