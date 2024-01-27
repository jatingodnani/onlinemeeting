import { useContext, useState, useEffect } from "react";
import { Cont } from "@/context/socketprovider";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/ui/compo/Player";
import { Key } from "lucide-react";
import Userplayer from "@/hooks/userplayer";

const Room = () => {
  const socket = useContext(Cont);
  const { mypeer, peerid } = usePeer();
  const { allstream, setallstream } =
    Userplayer();

  const { stream } = useMediaStream();
  useEffect(() => {
    if (!socket) return;
    function handleconnected(id) {
      const call = mypeer.call(id, stream);
      call.on("stream", (incomingstream) => {
        console.log(id);
        setallstream((prev) => ({
          ...prev,
          [id]: {
            url:incomingstream,
            muted: false,
            playing: false,
          },
        }));
      });
    }
    socket.on("user-connected", handleconnected);
    return () => {
      socket.off("user-connected", handleconnected);
    };
  }, [socket, mypeer, stream]);

  useEffect(() => {
    if (!mypeer || !stream) return;
    mypeer.on("call", (call) => {
      const { peer: callid } = call;
      call.answer(stream);
      call.on("stream", (incomingstream) => {
        console.log(`incoming stream coming from ${callid}`);
        console.log(callid);
        setallstream((prev) => ({
          ...prev,
          [callid]: {
            url: stream,
            muted: false,
            playing: false,
          },
        }));
      });
    });
  }, [stream, mypeer]);

  useEffect(() => {
    if (!stream || !peerid) return;
    console.log(`setting my stream ${peerid}`);
    setallstream((prev) => ({
      ...prev,
      [peerid]: {
        url: stream,
        muted: false,
        playing: false,
      },
    }));
  }, [peerid,stream]);

console.log(allstream)
  return (
    <div>
      
        {Object.keys(allstream).map((playerId) => {
console.log(playerId)
          const { url, muted, playing } = allstream[playerId];
          
          return (
            <Player
              key={playerId}
              stream={url}
              muted={muted}
              playing={playing}
            
            />
          );
        })}
      </div>
  
  );
};
export default Room;
