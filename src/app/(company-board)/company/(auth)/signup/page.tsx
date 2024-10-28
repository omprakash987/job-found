'use client'

import axios from 'axios';
import Link from 'next/link';
 
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Page = () => {
  const router = useRouter(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(""); 

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button behavior

    try {
      const response = await axios.post('/api/company/signup', {
        email, password
      });

      router.push('/company/signin');
      toast.success(`Signup successful`);  
      console.log("Response from signup page:", response); 
    } catch (error) {
      toast.error(`Error signing up`);
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-300 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Company Sign Up</h1>
        
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          placeholder='Enter your email' 
          className="w-full p-3 mb-4 text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
        />
        
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          placeholder='Enter your password' 
          className="w-full p-3 mb-6 text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
        />
        
        <button 
          onClick={handleSignup} 
          className="w-full py-3 font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
          Sign Up
        </button>
        <p className="text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/company/signin">
                        <span className="font-semibold text-blue-500 underline hover:text-blue-600">Sign in</span>
                    </Link>
                </p>
      </div>
    </div>
  )
}

export default Page;
