"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleSignIn = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('/api/company/signin', { email, password });
      toast.success("Sign-in successful");
      router.push('/company/profile'); 
      console.log("Response from sign-in page:", response); 
    } catch (error: any) {
      console.log("Error:", error);
      toast.error("Sign-in failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Company Sign-In</h1>
        
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
        />
        
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-6 text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
        />
        
        <button 
          onClick={handleSignIn} 
          className="w-full py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
          Sign In
        </button>
        <p className="text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/company/signup">
                        <span className="font-semibold text-blue-500 underline hover:text-blue-600">Sign up</span>
                    </Link>
                </p>
      </div>
    </div>
  )
}

export default Page;
