'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSignIn = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('/api/user/signin', {
        email, password
      }); 
      console.log("User signed in:", response);
      toast.success("Signed in successfully");
      router.push('/jobs/profile'); 
    } catch (error) {
      console.log("Error:", error);
      toast.error("Sign-in failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-teal-600">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h1>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="w-full p-3 mb-4 text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
        />
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="w-full p-3 mb-6 text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
        />
        <button 
          onClick={handleSignIn} 
          className="w-full py-3 mb-4 font-semibold text-white bg-gradient-to-r from-teal-500 to-green-600 rounded-lg hover:from-teal-600 hover:to-green-700 transition-all">
          Sign In
        </button>
        <p className="text-center text-gray-600">
          Don’t have an account?{' '}
          <Link href="/jobs/signup">
            <span className="font-semibold text-green-500 underline hover:text-green-600">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page
