
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

import styles from "@/components/ui/compo/system.module.css";
import { cx } from "class-variance-authority";

const Bottom = (props) => {
  const { muted, playing, toggleaudio, toggleVideo, leaveRoom } = props;

  return (
    <div className=" w-[300px] absolute flex justify-between left-0 right-0 mx-auto">
      {muted ? (
        <MicOff
          className="p-4 rounded-full cursor-pointer bg-#343a40"
          size={55}
          onClick={toggleaudio}
        />
      ) : (
        <Mic className="p-4 rounded-full text-white cursor-pointer bg-#343a40" size={55}  onClick={toggleaudio}  />
      )}
      {playing ? (
        <Video className="p-4 rounded-full cursor-pointer bg-#92c3f5" size={55}  />
      ) : (
        <VideoOff
        className="p-4 rounded-full cursor-pointer bg-#343a40"
          size={55}
       
        />
      )}
      <PhoneOff size={55} className="p-4 rounded-full cursor-pointer bg-#343a40" />
    </div>
  );
};

export default Bottom;