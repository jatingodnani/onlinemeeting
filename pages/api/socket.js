import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    
    const io = new Server(res.socket.server)
    res.socket.server.io = io
   io.on("connection",(socket)=>{

    socket?.on('join-room',(roomid,id)=>{
      console.log(`a new user joined with roomid${roomid}, and peer id ${id}`)
      socket.join(roomid);
      socket.broadcast.to(roomid).emit("user-connected",id)
})
   });
  }
  res.end()
}

export default SocketHandler