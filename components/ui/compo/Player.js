import { cn } from '@/lib/utils'
import React from 'react'
import ReactPlayer from 'react-player'
function Player({stream,muted,playing,isActive}) {

  return (
    <div className={cn(
      "relative overflow-hidden mb-5 h-full",
      {
        'rounded-lg': isActive,
        'rounded-md h-min w-[260px] shadow-md': !isActive,
      }
    )}>
    <ReactPlayer url={stream} muted={muted} playing={playing} width="100%" height="100%"  />
    </div>
  )
}

export default Player