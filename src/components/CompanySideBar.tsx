'use client'

import Link from 'next/link';
import React from 'react';
import { FaHome, FaUser, FaBriefcase, FaClipboardCheck, FaEnvelope, FaCompass } from 'react-icons/fa'; 
import { FaWpforms } from "react-icons/fa";
const CompanySideBar = () => {
  return (
    <div className="flex flex-col w-64 min-h-screen bg-gray-800 text-white overflow-hidden">
       
      <nav className="flex flex-col mt-4">
        <Link href="/company/home" className="flex items-center p-4 hover:bg-gray-700">
          <FaHome className="mr-3" /> Home
        </Link>
        <Link href="/company/profile" className="flex items-center p-4 hover:bg-gray-700">
          <FaUser className="mr-3" /> Profile
        </Link>
        <Link href="/company/create-jobs" className="flex items-center p-4 hover:bg-gray-700">
          <FaBriefcase className="mr-3" /> create job
        </Link>
        <Link href="/company/created-jobs" className="flex items-center p-4 hover:bg-gray-700">
          <FaClipboardCheck className="mr-3" /> created jobs
        </Link>
        <Link href="/company/applications" className="flex items-center p-4 hover:bg-gray-700">
        <FaWpforms className=' mr-3' /> job applications
        </Link>
        <Link href="/company/message" className="flex items-center p-4 hover:bg-gray-700">
          <FaEnvelope className="mr-3" /> Message
        </Link>
        <Link
         href="/company/discover" className="flex items-center p-4 hover:bg-gray-700">
          <FaCompass className="mr-3" /> Discover
        </Link>
      </nav>
    </div>
  );
}

export default CompanySideBar;