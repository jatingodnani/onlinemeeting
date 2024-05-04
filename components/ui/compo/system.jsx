import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

import styles from "@/components/ui/compo/system.module.css";
import { cx } from "class-variance-authority";

const Bottom = (props) => {
  const { status, setStatus, disconnect } = props;

  return (
    <div className="flex justify-center gap-4 w-full p-2">
      <button
        type="button"
        className="hover:bg-gray-300 rounded-full transition-colors bg-gray-200"
        onClick={() => setStatus((prev) => ({ ...prev, muted: !prev.muted }))}
      >
        {status.muted ? (
          <MicOff
            className="p-4 rounded-full cursor-pointer bg-#343a40"
            size={55}
          />
        ) : (
          <Mic
            className="p-4 rounded-full cursor-pointer bg-#343a40"
            size={55}
          />
        )}
      </button>
      <button
        type="button"
        className="hover:bg-gray-300 rounded-full transition-colors bg-gray-200"
        onClick={() =>
          setStatus((prev) => ({ ...prev, playing: !prev.playing }))
        }
      >
        {status.playing ? (
          <Video
            className="p-4 rounded-full cursor-pointer bg-#92c3f5"
            size={55}
          />
        ) : (
          <VideoOff
            className="p-4 rounded-full cursor-pointer bg-#343a40"
            size={55}
          />
        )}
      </button>
      <button
        type="button"
        onClick={() => disconnect()}
        className="hover:bg-gray-300 rounded-full transition-colors bg-gray-200"
      >
        <PhoneOff
          size={55}
          className="p-4 rounded-full cursor-pointer bg-#343a40"
        />
      </button>
    </div>
  );
};

export default Bottom;
