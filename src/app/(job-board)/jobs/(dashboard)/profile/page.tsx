'use client'

import axios from 'axios'
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    profession: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    achievements: [],
    socialLinks: [],
    userId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userProfile = await axios.get('/api/jobs/profile');
        if (userProfile.data && userProfile.data.profile && userProfile.data.profile.length > 0) {
          setProfile(userProfile.data.profile[0]);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Profile) => {
    const { name, value } = e.target;
    setProfile(prev => {
      const newArray = [...prev[field]];
      newArray[index] = { ...newArray[index], [name]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const handleAddItem = (field: keyof Profile) => {
    setProfile(prev => ({
      ...prev,
      [field]: [...prev[field], {} as any]
    }));
  };

  const handleRemoveItem = (field: keyof Profile, index: number) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/jobs/profile', profile);
      if (response.status === 200) {
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  if (!isEditing) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen w-full">
        <div className='flex flex-row-reverse'>
          <button className='border-2 border-black rounded-sm p-2' onClick={() => setIsEditing(true)}>
            Edit profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Add similar input fields for lastName, profession, bio, etc. */}

        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-4 p-2 border rounded">
            <input
              type="text"
              name="title"
              value={exp.title || ''}
              onChange={(e) => handleArrayInputChange(e, index, 'experience')}
              placeholder="Job Title"
              className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {/* Add similar inputs for company, startDate, endDate, description */}
            <button type="button" onClick={() => handleRemoveItem('experience', index)} className="mt-2 bg-red-500 text-white py-1 px-2 rounded">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem('experience')} className="mb-4 bg-blue-500 text-white py-1 px-2 rounded">
          Add Experience
        </button>

        {/* Add similar sections for education, achievements, and socialLinks */}

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Profile
          </button>
          <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;