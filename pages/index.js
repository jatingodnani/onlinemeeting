
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from '@/components/ui/separator';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
 
export default function Home() {
  const router=useRouter();
const [roomnum,setrootid]=useState()
  const createRoom=()=>{
    const roomid=uuidv4();
router.push(`/${roomid}`)
  }

const joinRoom=()=>{

if(roomnum){router.push(`/${roomnum}`)}
else{
 alert("Please Enter room-id")
}
}
  return (
  
    <Card className="w-[30%] p-3 mt-[15%] ml-[10%]">
  <CardHeader>
    <CardTitle>ONLINE-MEET</CardTitle>
   
  </CardHeader>
  <CardContent>
  <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email" >Enter Room Id</Label>
      <Input type="email" id="email" value={roomnum} placeholder="Id" onChange={(e)=>setrootid(e.target.value)} />
      <Button className="w-full bg-blue-400 " onClick={joinRoom}>Join room</Button>
    </div>
    <div className='flex w-full items-center  gap-1 mt-2'>

    <Separator className="w-[50%]"/>
    <p>OR</p>
    <Separator className="w-[50%]"/>
    </div>
  </CardContent>
  <CardFooter>
  <Button className="w-full bg-red-500 text-white" onClick={createRoom}>Create a new Room</Button>
  </CardFooter>
</Card>

  );
}
