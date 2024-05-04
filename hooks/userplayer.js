import { cloneDeep } from "lodash";
import { useState } from "react";
const Userplayer = (id) => {
  const [allstream, setallstream] = useState({});
  const cloneallstream=cloneDeep(allstream);
const highligted=cloneallstream[id];
delete cloneallstream[id]
const nonhightlighted=cloneallstream;


  return { highligted,nonhightlighted,allstream, setallstream };
};

export default Userplayer;
