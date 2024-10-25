

'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

const page = () => {
    const router = useRouter(); 

    const [email,setEmail] = useState(''); 
    const [password,setPassword] = useState(''); 

    const handleSignIn = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault(); 

        try{

            const response = await axios.post('/api/user/signup',{
                email,password
            })
            console.log("user created from page signup : " , response); 
            router.push('/jobs/signin')

        }
        catch(error:any){
            toast.error("user already exists");
            console.log(error); 
            
        }


    }
  return (
    <div>
        <h1>sign up page</h1>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='email' />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' />
        <button onClick={handleSignIn}>sign-up</button>
        <span className=' underline ml-4'>
            <Link href="/jobs/signin">
            already have an account? sign in
            </Link>
        </span>
    </div>
  )
}

export default page