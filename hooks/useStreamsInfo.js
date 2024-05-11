import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import useEffectStrict from "./useEffectStrict";
const useStreamsInfo = (id) => {
  const [allStreamsInfo, setAllStreamsInfo] = useState({});
  const cloneAllStreamsInfo = cloneDeep(allStreamsInfo);
  const myStreamInfo = cloneAllStreamsInfo[id];
  delete cloneAllStreamsInfo[id];
  const otherStreamsInfo = cloneAllStreamsInfo;

  useEffectStrict(() => {
    console.log("Streams Update", allStreamsInfo);
  }, [allStreamsInfo]);

  return { myStreamInfo, otherStreamsInfo, allStreamsInfo, setAllStreamsInfo };
};

export default useStreamsInfo;
