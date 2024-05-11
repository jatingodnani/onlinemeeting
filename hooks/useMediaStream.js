import { useEffect, useRef, useState } from "react";
import useEffectStrict from "./useEffectStrict";

function useMediaStream() {
  const [myStream, setMyStream] = useState(null);
  useEffectStrict(() => {
    (async function initstream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("setting your stream");
        setMyStream(stream);
        console.log(myStream, stream);
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {
      myStream && myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
    };
  }, []);

  return { stream: myStream && myStream };
}

export default useMediaStream;
