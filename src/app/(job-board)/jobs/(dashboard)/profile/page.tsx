'use client'

import axios from 'axios'
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'; 

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

interface Achievement {
  title: string;
  description?: string;
  date?: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface Profile {
  firstName: string;
  lastName: string;
  profession: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
  socialLinks: SocialLink[];
  userId: string;
}

const Page = () => {
  const [profile, setProfile] = useState<Profile[]>([]);
  const id = uuidv4(); 
  

  useEffect(() => {
    const getProfile = async () => {
      const userProfile = await axios.get('/api/jobs/profile');
      console.log("userProfile:", userProfile.data.profile);
      setProfile(userProfile.data.profile);
    };
    getProfile();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
     <div className=' flex flex-row-reverse '>
     <button className=' border-2 border-black rounded-sm p-2' >
        <Link href={`/jobs/profile/${id}`}>
        Edit profile
        </Link>
      </button>
     </div>
      {
        profile.map((item, index) => (
          <div key={index} className='bg-white shadow-md rounded-lg p-4 mb-6'>
            <h2 className="text-xl font-bold mb-2">{item.firstName} {item.lastName}</h2>
            <div className="text-gray-600 mb-2">Profession: <span className="font-semibold">{item.profession}</span></div>
            <div className="text-gray-600 mb-4">Bio: {item.bio}</div>
            <div className="text-gray-600 mb-4">Skills: <span className="font-semibold">{item.skills.join(', ')}</span></div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Experience:</h3>
              {item.experience.map((exp, expIndex) => (
                <div key={expIndex} className="border-b pb-2 mb-2">
                  <div className="font-semibold">{exp.title} at {exp.company}</div>
                  <div className="text-gray-500">{new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</div>
                  {exp.description && <div className="text-gray-600">{exp.description}</div>}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Education:</h3>
              {item.education.map((edu, eduIndex) => (
                <div key={eduIndex} className="border-b pb-2 mb-2">
                  <div className="font-semibold">{edu.degree} from {edu.institution}</div>
                  <div className="text-gray-500">{new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}</div>
                  <div className="text-gray-600">Field of Study: {edu.fieldOfStudy}</div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Achievements:</h3>
              {item.achievements.map((ach, achIndex) => (
                <div key={achIndex} className="border-b pb-2 mb-2">
                  <div className="font-semibold">{ach.title}</div>
                  {ach.description && <div className="text-gray-600">{ach.description}</div>}
                  {ach.date && <div className="text-gray-500">{new Date(ach.date).toLocaleDateString()}</div>}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Social Links:</h3>
              {item.socialLinks.map((link, linkIndex) => (
                <div key={linkIndex} className="mb-2">
                  <div className="text-gray-600">{link.platform}: <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.url}</a></div>
                </div>
              ))}
            </div>

          </div>
        ))
      }
    </div>
  );
};

export default Page;
