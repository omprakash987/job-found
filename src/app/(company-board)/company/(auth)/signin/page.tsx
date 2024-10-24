
"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
  const [email,setEmail] = useState(''); 
  const [password,setPassword] = useState('');
  const router = useRouter() ; 

  const handleSignIn = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault(); 

    try {
      const  response = await axios.post('/api/company/signin',{
        email,password
      })
      toast.success("signin success")
      router.push('/company/home'); 
      console.log("response from signin page : " , response); 

    } catch (error:any) {
      console.log("error : ", error);
      toast.error("signin failed")
      
    }

  }
  return (
    <div>
      <h1 className=' text-4xl font-bold'> signin page </h1>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='email' />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' />
      <button onClick={handleSignIn}>signin</button>
    </div>
  )
}

export default page