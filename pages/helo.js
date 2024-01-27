import useMediaStream from '@/hooks/useMediaStream'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

function Helo() {
    const [hlo,sethlo]=useState("")
    
    const {stream}=useMediaStream();
useEffect(()=>{
sethlo(stream)
},[stream])
console.log(hlo)
  return (
    <div className='w-[100%] h-[100%] bg-black'>
        <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
        hii{
            hlo&& <ReactPlayer url={hlo}/>
        }

    </div>
  )
}

export default Helo