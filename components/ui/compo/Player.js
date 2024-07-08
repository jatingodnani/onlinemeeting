import { cn } from "@/lib/utils";
import { MicOff, Speaker, VideoOff } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
function Player({ stream, muted, playing, isActive, className, id }) {
  return (
    <div
      className={cn("relative overflow-hidden bg-gray-950", {
        "rounded-xl": isActive,
        "rounded-xl h-min w-[260px] shadow-md": !isActive,
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
        style={{ objectFit: "cover", transform: "rotateY(180deg)" }}
      />
      {!isActive && (
        <div className="absolute bottom-0 left-0 flex gap-1 p-1">
          <div className="text-white bg-gray-800 rounded-full p-2">
            {muted ? <MicOff className="h-4 w-4" /> : <Speaker className="h-4 w-4" />}
          </div>
          {!playing && (
            <div className="text-white bg-gray-800 rounded-full p-2">
              <VideoOff className="h-4 w-4" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Player;
