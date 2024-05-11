import React, { useEffect } from "react";

export default function useEffectStrict(callback, dependencies = []) {
  // const initialRender = React.useRef(true);
  useEffect(() => {
    // if (initialRender.current) {
    //   initialRender.current = false;
    //   return;
    // }
    const unmountCallback = callback();
    return unmountCallback;
  }, [...dependencies]);
}
