"use client"


import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const router = useRouter();
  const [email,setEmail] = useState(''); 
  const [password,setPassword] = useState('');

  const handleSignIn = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault(); 
 try {
  const response = await axios.post('/api/user/signin',{
    email,password
  }); 
  console.log("user created from page signup : " , response);
  router.push('/jobs/home'); 
  
 } catch (error) {
    console.log("error : ", error);
    
 }
  }
  return (
  <div>
    <h1>sign in page</h1>

    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
    <button onClick={handleSignIn}>sign-in</button>
    <span>
      don't have an account? <Link href={'/jobs/signup'}> signup</Link>
    </span>
  </div>
  )
}

export default page