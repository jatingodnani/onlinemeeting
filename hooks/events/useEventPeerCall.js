import React from "react";
import useEffectStrict from "../useEffectStrict";

export default function useEventPeerCall(
  peerHandler,
  stream,
  setAllStreamsInfo
) {
  useEffectStrict(() => {
    if (!peerHandler || !stream) return;
    peerHandler.on("call", (call) => {
      const { peer: callid, metadata } = call;
      call.answer(stream);
      call.on("stream", () => {
        console.log("Someone called me with id", callid, metadata);
        setAllStreamsInfo((prev) => ({
          ...prev,
          [callid]: {
            url: stream,
            muted: metadata?.muted ?? false,
            playing: metadata?.playing ?? false,
          },
        }));
      });
    });
  }, [stream, peerHandler]);
}
