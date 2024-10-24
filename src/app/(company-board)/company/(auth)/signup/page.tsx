'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter(); 

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(""); 

 const handleSignup = async(e:React.MouseEvent<HTMLButtonElement>)=>{

  try {

    const response = await axios.post('/api/company/signup',{
      email,password
    })

    router.push('/company/signin')
    toast.success(`signup successfyll`)
    
   console.log("response from signup page : " , response); 

    
  } catch (error:any) {
    toast.error(`error signing up`)
    console.log(error)
    
  }


 }

  return (
    <div>
      <h1 className=' text-4xl font-bold'> signup page</h1>
<input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='enter the email' />
<input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='enter the password' />
<button onClick={handleSignup} className=' text-white p-2'>signup</button>

    </div>
  )
}

export default page