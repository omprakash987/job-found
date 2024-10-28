'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleJob = () => {
    router.push('/jobs/signup');
  }

  const handleHire = () => {
    router.push('/company/signup');
  }

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Fullscreen background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center" 
           style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?office,tech')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
          Discover Your Next Opportunity
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          Whether you're looking for your dream job or the perfect candidate, we're here to connect you.
        </p>

        <div className="flex space-x-6">
          <button 
            onClick={handleJob} 
            className="px-8 py-3 font-semibold text-lg rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg transform hover:scale-110 transition duration-300 ease-in-out hover:shadow-pink-500/50">
            Looking for a Job
          </button>

          <button 
            onClick={handleHire} 
            className="px-8 py-3 font-semibold text-lg rounded-lg bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 shadow-lg transform hover:scale-110 transition duration-300 ease-in-out hover:shadow-cyan-500/50">
            Find Your Next Hire
          </button>
        </div>
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
