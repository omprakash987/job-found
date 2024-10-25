
'use client'

import { IoIosLogOut } from "react-icons/io";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa';
import axios from "axios";
import Image from "next/image";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter(); 


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };


    const handleProfile = ()=>{
router.push('/jobs/profile')
    }

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
        <h1 onClick={handleHomePage} className="text-xl font-bold cursor-pointer">
        <Image className=" rounded-full pt-10 ml-5" src="/logo.jpeg" width="80" height="80" alt="my logo"></Image>
        </h1>

      </div>

      <div className="search"> 

        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search..." className="p-2 rounded text-black" />

      </div>

      <div className="icons flex items-center"> 

        <FaBell className="mx-2 cursor-pointer" />  

        <FaUserCircle onClick={handleProfile} className="mx-2 cursor-pointer" />  
        <IoIosLogOut onClick={handleLogout} className=" mx-2 cursor-pointer" />

      </div>

    </div>

  )
}


export default Navbar