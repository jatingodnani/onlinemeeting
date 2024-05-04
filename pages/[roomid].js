import { useContext, useState, useEffect } from "react";
import { Cont } from "@/context/socketprovider";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/ui/compo/Player";
import { Key } from "lucide-react";
import Userplayer from "@/hooks/userplayer";
import Bottom from "@/components/ui/compo/system";
import { cloneDeep } from "lodash";

const Room = () => {
  const socket = useContext(Cont);
  const { mypeer, peerid } = usePeer();
  const { allstream, setallstream, highligted,nonhightlighted } =
    Userplayer(peerid);

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
            muted: true,
            playing: true,
          },
        }));
      });
    }
    socket.on("user-connected", handleconnected);
    return () => {
      socket.off("user-connected", handleconnected);
    };
  }, [socket, mypeer, stream]);
const toogleaudio=()=>{
  console.log("clicked")
  setallstream((prev)=>{
   const copy=cloneDeep(prev);
   copy[peerid].muted=!copy[peerid].muted
   return {...copy}
  })
}
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
            muted: true,
            playing: true,
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
        muted: true,
        playing: true,
      },
    }));
  }, [peerid,stream]);

console.log(allstream)
  return (
    <>
    <div className="absolute w-8/12 left-0 right-0 mx-auto top-20 bottom-50"
     style={{ height: 'calc(100vh - 20px - 100px)' }}>
      {
        highligted && <Player isActive={true} stream={highligted?.url} playing={true} muted={true} />
      }
    </div>
    <div className="absolute flex flex-col overflow-y-auto w-100"
     style={{ height: 'calc(100vh - 20px)', right: '20px', top: '20px' }}>
  {Object.keys(nonhightlighted).map((playerId) => {

          const { url, muted, playing } = nonhightlighted[playerId];
          
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
      <Bottom muted={true} playing={true} toogleaudio={toogleaudio} />
      </>
  );
};
export default Room;
