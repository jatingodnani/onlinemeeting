import { useEffect, useRef, useState } from "react";

function useMediaStream() {
  const [myStream, setMyStream] = useState(null);
  const isStreamSet = useRef(false);
  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;
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
  }, []);

  return { stream: myStream && myStream };
}

export default useMediaStream;
