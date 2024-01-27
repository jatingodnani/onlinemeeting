import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
 export const Cont=createContext(null)
const Socketcontext = ({children}) => {
    const [socket,setsocket]=useState(null);
    useEffect(()=>{
const connection=io();
setsocket(connection);

 },[])

    socket?.on("connection-error",async(err)=>{

await fetch("/api/socket")
    })
    return (
       <Cont.Provider value={socket}>
            {children}
       </Cont.Provider>
    );
}

export default Socketcontext;