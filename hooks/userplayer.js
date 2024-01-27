import { cloneDeep } from "lodash";
import { useState } from "react";
const Userplayer = () => {
  const [allstream, setallstream] = useState({});
  

  return { allstream, setallstream };
};

export default Userplayer;
