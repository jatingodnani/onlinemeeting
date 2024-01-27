import { Cont } from "@/context/socketprovider";
import { useRouter } from "next/router";

const { useState, useEffect, useRef, useContext } = require("react");

const usePeer = () => {
  const [mypeer, setpeer] = useState(null);
  const [peerid, setid] = useState("");
  const ispeerref = useRef(false);
  const socket = useContext(Cont);
  const roomid = useRouter().query.roomid;

  useEffect(() => {
    if (ispeerref.current || !roomid || !socket) return;
    ispeerref.current = true;
    (async function ispeer() {
      const mypeer = new (await import("peerjs")).default();
      setpeer(mypeer);

      mypeer.on("open", (id) => {
        setid(id);
        socket?.emit("join-room", roomid, id);
      });
    })();
  }, [roomid, socket]);

  return {
    mypeer,
    peerid,
  };
};

export default usePeer;
