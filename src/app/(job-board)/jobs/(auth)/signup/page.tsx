'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

const Page = () => {
    const router = useRouter(); 

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const handleSignIn = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('/api/user/signup', {
                email, password
            })
            console.log("User created from page signup:", response); 
            router.push('/jobs/signin')
        } catch(error: any) {
            toast.error("User already exists");
            console.log(error); 
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
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
                    className="w-full py-3 mb-4 font-semibold text-white bg-gradient-to-r from-orange-400 to-red-500 rounded-lg hover:from-orange-500 hover:to-red-600 transition-all">
                    Sign Up
                </button>
                <p className="text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/jobs/signin">
                        <span className="font-semibold text-blue-500 underline hover:text-blue-600">Sign in</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Page
