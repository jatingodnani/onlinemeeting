import Image from "next/image";
import { Inter } from "next/font/google";
import useMediaStream from "@/hooks/useMedia";
import ReactPlayer from "react-player";
import { useState,useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  const {stream}=useMediaStream()
  console.log(stream)
  return (
    <>
    {
      isClient &&  <ReactPlayer url={stream} />
    }
  </>
  );
}
