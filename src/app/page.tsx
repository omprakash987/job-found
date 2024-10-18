'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); 
  const handlejob = ()=>{
router.push('/jobs/signup')
  }
  const handlehire = ()=>{
    router.push('/company')
      }
  return (
    <div className=" flex justify-center items-center h-screen">
    
    <div className="flex flex-col w-20 h-30">
    <button onClick={handlejob} className=" border-2 border-black">looking for job</button>
    <button onClick={handlehire} className="  border-2 border-black">find your next hire</button>
    </div>
    </div>
  );
}
