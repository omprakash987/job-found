
'use client'

import { IoIosLogOut } from "react-icons/io";
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa';
import axios from "axios";

const Navbar = () => {
    const router = useRouter(); 


    const handleLogout = async()=>{
       const response = await axios.get('/api/user/logout'); 
        console.log('response : ' , response.data);
        router.push('/jobs/signin')
        
    }

    const handleHomePage = ()=>{
        router.push('/jobs/home')
    }

  return (

    <div className="flex items-center justify-between p-4 bg-gray-800 text-white"> 

      <div className="logo"> 
        <h1 onClick={handleHomePage} className="text-xl font-bold cursor-pointer">MyLogo</h1>

      </div>

      <div className="search"> 

        <input type="text" placeholder="Search..." className="p-2 rounded" />

      </div>

      <div className="icons flex items-center"> 

        <FaBell className="mx-2 cursor-pointer" />  

        <FaUserCircle className="mx-2 cursor-pointer" />  
        <IoIosLogOut onClick={handleLogout} className=" mx-2 cursor-pointer" />

      </div>

    </div>

  )
}


export default Navbar