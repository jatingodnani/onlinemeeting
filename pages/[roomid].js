import { useContext, useState } from "react";
import { SocketContext } from "@/context/socketprovider";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/ui/compo/Player";
import { ArrowLeft } from "lucide-react";
import useStreamsInfo from "@/hooks/useStreamsInfo";
import Bottom from "@/components/ui/compo/system";
import { useRouter } from "next/router";
import Link from "next/link";
import useEffectStrict from "@/hooks/useEffectStrict";
import useEventUserConnnected from "@/hooks/events/useEventUserConnnected";
import useEventPeerCall from "@/hooks/events/useEventPeerCall";
import useEventUpdateOtherUser from "@/hooks/events/useEventUpdateOtherUser";
import useEventLeftChat from "@/hooks/events/useEventLeftChat";

const Room = () => {
  const router = useRouter();
  const { roomid } = router.query;
  const [status, setStatus] = useState({
    muted: true,
    playing: true,
  });

  // Hooks
  const socket = useContext(SocketContext);
  const { peerHandler, peerId } = usePeer();
  const { setAllStreamsInfo, myStreamInfo, otherStreamsInfo } =
    useStreamsInfo(peerId);
  const { stream } = useMediaStream();

  // INCOMING EVENTS
  useEventUserConnnected(peerHandler, stream, setAllStreamsInfo, status);
  useEventPeerCall(peerHandler, stream, setAllStreamsInfo);
  useEventUpdateOtherUser(setAllStreamsInfo, status);
  useEventLeftChat(setAllStreamsInfo, peerId);

  // OUTGOING EVENTS
  const handleSelfDisconnect = () => {
    if (!socket || !peerId) return;
    socket.emit("leave-chat");
    router.push("/");
  };
  useEffectStrict(() => {
    if (!socket) return;
    socket.emit("update-user", peerId, roomid, status);
  }, [status, socket]);

  // Other Events
  useEffectStrict(() => {
    if (!stream || !peerId) return;

    console.log(`setting my stream ${peerId}`);
    setAllStreamsInfo((prev) => ({
      ...prev,
      [peerId]: {
        url: stream,
        ...status,
      },
    }));
  }, [peerId, stream, status]);

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
