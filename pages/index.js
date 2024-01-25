import Image from "next/image";

import { useContext, useEffect } from "react";
import  { Cont } from "@/context/socketprovider";



export default function Home() {
 const socket=useContext(Cont);
console.log(socket?.id)

 useEffect(()=>{

  socket?.on("connection",()=>{
    console.log("connected",socket.id)
  })
 },[])
  return (
   <h1>welcome</h1>
  );
}
