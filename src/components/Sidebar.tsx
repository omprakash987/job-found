import Link from 'next/link';
import React from 'react';
import { FaHome, FaUser, FaBriefcase, FaClipboardCheck, FaEnvelope, FaCompass } from 'react-icons/fa'; // Importing icons

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 min-h-screen bg-gray-800 text-white overflow-hidden">
       
      <nav className="flex flex-col mt-4">
        <Link href="/jobs/home" className="flex items-center p-4 hover:bg-gray-700">
          <FaHome className="mr-3" /> Home
        </Link>
        <Link href="/jobs/profile" className="flex items-center p-4 hover:bg-gray-700">
          <FaUser className="mr-3" /> Profile
        </Link>
        <Link href="/jobs/job" className="flex items-center p-4 hover:bg-gray-700">
          <FaBriefcase className="mr-3" /> Job
        </Link>
        <Link href="/jobs/applied" className="flex items-center p-4 hover:bg-gray-700">
          <FaClipboardCheck className="mr-3" /> Applied
        </Link>
        <Link href="/jobs/message" className="flex items-center p-4 hover:bg-gray-700">
          <FaEnvelope className="mr-3" /> Message
        </Link>
        <Link
         href="/jobs/discover" className="flex items-center p-4 hover:bg-gray-700">
          <FaCompass className="mr-3" /> Discover
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;