import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

const Bottom = (props) => {
  const { status, setStatus, disconnect } = props;

  return (
    <div className="flex justify-center gap-4 w-full p-2 fixed bottom-0 left-0">
      <button
        type="button"
        className="hover:bg-gray-900 rounded-full transition-colors bg-gray-950"
        onClick={() => setStatus((prev) => ({ ...prev, muted: !prev.muted }))}
      >
        {status.muted ? (
          <MicOff
            className="p-4 rounded-full cursor-pointer text-white"
            size={55}
          />
        ) : (
          <Mic
            className="p-4 rounded-full cursor-pointer text-white"
            size={55}
          />
        )}
      </button>
      <button
        type="button"
        className="hover:bg-gray-900 rounded-full transition-colors bg-gray-950"
        onClick={() =>
          setStatus((prev) => ({ ...prev, playing: !prev.playing }))
        }
      >
        {status.playing ? (
          <Video
            className="p-4 rounded-full cursor-pointer text-white"
            size={55}
          />
        ) : (
          <VideoOff
            className="p-4 rounded-full cursor-pointer text-white"
            size={55}
          />
        )}
      </button>
      <button
        type="button"
        onClick={() => disconnect()}
        className="hover:bg-gray-900 rounded-full transition-colors bg-gray-950"
      >
        <PhoneOff
          size={55}
          className="p-4 rounded-full cursor-pointer text-white"
        />
      </button>
    </div>
  );
};

export default Bottom;
