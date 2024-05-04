import { useContext, useState, useEffect } from "react";
import { SocketContext } from "@/context/socketprovider";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/ui/compo/Player";
import { Key } from "lucide-react";
import useStreamsInfo from "@/hooks/useStreamsInfo";
import Bottom from "@/components/ui/compo/system";
import { cloneDeep } from "lodash";

const Room = () => {
  const socket = useContext(SocketContext);
  const { peerHandler, peerId } = usePeer();
  const { setAllStreamsInfo, myStreamInfo, otherStreamsInfo } =
    useStreamsInfo(peerId);
  const { stream } = useMediaStream();

  const toggleAudio = () => {
    setAllStreamsInfo((prev) => {
      const copy = cloneDeep(prev);
      copy[peerId].muted = !copy[peerId].muted;
      return { ...copy };
    });
  };

  // Calling New Connections
  useEffect(() => {
    if (!socket) return;
    function handleUserConnection(id) {
      const call = peerHandler.call(id, stream);
      call.on("stream", (incomingStreamUrl) => {
        console.log(id);
        setAllStreamsInfo((prev) => ({
          ...prev,
          [id]: {
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

  // Answering to Calls
  useEffect(() => {
    if (!peerHandler || !stream) return;
    peerHandler.on("call", (call) => {
      const { peer: callid } = call;
      call.answer(stream);
      call.on("stream", (incomingstream) => {
        console.log(`incoming stream coming from ${callid}`);
        console.log(callid);
        setAllStreamsInfo((prev) => ({
          ...prev,
          [callid]: {
            url: stream,
            muted: true,
            playing: true,
          },
        }));
      });
    });
  }, [stream, peerHandler]);

  // Updating my info [incase it changes]
  useEffect(() => {
    if (!stream || !peerId) return;
    console.log(`setting my stream ${peerId}`);
    setAllStreamsInfo((prev) => ({
      ...prev,
      [peerId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [peerId, stream]);

  return (
    <>
      <div
        className="absolute w-8/12 left-0 right-0 mx-auto top-20 bottom-50"
        style={{ height: "calc(100vh - 20px - 100px)" }}
      >
        {myStreamInfo && (
          <Player
            isActive={true}
            stream={myStreamInfo?.url}
            playing={true}
            muted={true}
          />
        )}
      </div>
      <div
        className="absolute flex flex-col overflow-y-auto w-100"
        style={{ height: "calc(100vh - 20px)", right: "20px", top: "20px" }}
      >
        {Object.keys(otherStreamsInfo).map((playerId) => {
          const { url, muted, playing } = otherStreamsInfo[playerId];

          return (
            <Player
              key={playerId}
              stream={url}
              muted={false}
              playing={playing}
              isActive={false}
            />
          );
        })}
      </div>
      <Bottom muted={true} playing={true} toggleAudio={toggleAudio} />
    </>
  );
};
export default Room;
