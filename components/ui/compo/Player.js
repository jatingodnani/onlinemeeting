import { cn } from "@/lib/utils";
import { MicOff, Speaker, VideoOff } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
function Player({ stream, muted, playing, isActive, className, id }) {
  return (
    <div
      className={cn("relative overflow-hidden bg-black", {
        "rounded-lg": isActive,
        "rounded-md h-min w-[260px] shadow-md": !isActive,
        [className]: className,
        "h-40 w-40": !className,
      })}
    >
      <ReactPlayer
        url={stream}
        muted={isActive ? true : muted}
        playing={playing}
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      />
      {!isActive && (
        <div className="absolute bottom-0 left-0 flex gap-1 p-1">
          <div className="bg-white rounded-full p-1">
            {muted ? <MicOff /> : <Speaker />}
          </div>
          {!playing && (
            <div className="bg-white rounded-full p-1">
              <VideoOff />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Player;
