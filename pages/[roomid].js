import { useContext, useState, useEffect } from "react";
import { SocketContext } from "@/context/socketprovider";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/ui/compo/Player";
import { ArrowLeft, Key, Router } from "lucide-react";
import useStreamsInfo from "@/hooks/useStreamsInfo";
import Bottom from "@/components/ui/compo/system";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";

const Room = () => {
  const router = useRouter();
  const { roomid } = router.query;
  const socket = useContext(SocketContext);
  const { peerHandler, peerId } = usePeer();
  const { setAllStreamsInfo, myStreamInfo, otherStreamsInfo } =
    useStreamsInfo(peerId);
  const { stream } = useMediaStream();
  const [status, setStatus] = useState({
    muted: true,
    playing: true,
  });

  // [New Connection] -> Calling them
  useEffect(() => {
    if (!socket) return;
    function handleUserConnection(id) {
      const call = peerHandler.call(id, stream, {
        metadata: status,
      });
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

  // [Someone called me] -> answering them
  useEffect(() => {
    if (!peerHandler || !stream) return;
    peerHandler.on("call", (call) => {
      const { peer: callid, metadata } = call;
      console.log(metadata);
      call.answer(stream, { metadata: { joshi: "kartik" } });
      call.on("stream", () => {
        console.log(callid);
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

  // Updating my status
  useEffect(() => {
    if (!socket) return;
    console.log("[UPDATE-USER]->");
    socket.emit("update-user", peerId, roomid, status);
  }, [status, socket]);
  // Updating others status
  useEffect(() => {
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

  const handleSelfDisconnect = () => {
    socket?.emit("leave-chat", peerId, roomid);
    router.push("/");
  };
  useEffect(() => {
    if (!socket) return;
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

  return (
    <div className="h-screen flex flex-col">
      <div className="p-2">
        <Link
          href={`/`}
          type="button"
          className="hover:bg-gray-300 rounded-full transition-colors bg-gray-200 p-2"
        >
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex flex-col flex-grow gap-4">
        <div className="flex w-full h-96 items-center justify-center">
          {myStreamInfo && (
            <Player
              isActive={true}
              stream={myStreamInfo?.url}
              playing={status.playing}
              muted={status.muted}
              className="h-full"
            />
          )}
        </div>
        <div className="flex overflow-x-auto w-full justify-center gap-4 h-32">
          {Object.keys(otherStreamsInfo).map((playerId) => {
            const { url, muted, playing } = otherStreamsInfo[playerId];
            return (
              <Player
                key={playerId}
                stream={url}
                muted={muted}
                playing={playing}
                isActive={false}
                className="h-full min-w-[200px]"
              />
            );
          })}
        </div>
      </div>
      <Bottom
        status={status}
        setStatus={setStatus}
        disconnect={handleSelfDisconnect}
      />
    </div>
  );
};
export default Room;
