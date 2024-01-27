import { useEffect, useRef, useState } from "react"


function useMediaStream() {
    const [state,setstate]=useState(null);
    const isstreamset=useRef(false)
    useEffect(()=>{
        if(isstreamset.current) return;
        isstreamset.current=true;
(async function initstream(){
    try{
    const stream=await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
    })
    console.log("setting your stream")
    setstate(stream)
    console.log(state,stream)
    }
catch(err){
    console.log(err)
}
})()
    },[])

    return {stream:state && state}
 
}

export default useMediaStream