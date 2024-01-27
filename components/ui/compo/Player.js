import React from 'react'
import ReactPlayer from 'react-player'
function Player({stream,muted,playing}) {

  return (
    <div>
    <ReactPlayer url={stream} muted={muted} playing={playing}  />
    </div>
  )
}

export default Player