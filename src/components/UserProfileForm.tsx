'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { NextResponse } from 'next/server';

const UserProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profile, setProfile] = useState({
    id:'',
    firstName: '',
    lastName: '',
    profession: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    achievements: [],
    socialLinks: []
  });

  const [newItem, setNewItem] = useState({
    skill: '',
    experience: '',
    education: '',
    achievement: '',
    socialLink: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/jobs/profile');
      console.log("response from fetchProfile", response); 
      if (!response.ok) {
        if (response.status === 404) {
           
          return NextResponse.json({
            message: "Profile not found"
          }, {
            status: 404
          })
        }
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      setError('Failed to load profile data');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {

      const method = profile.id ? 'PUT' : 'POST';
      const response = await fetch('/api/jobs/profile', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to save profile');
      }

      setSuccess('Profile saved successfully');
      if (!profile.id) {
         
        fetchProfile();
      }
    } catch (error) {
      setError((error as Error).message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const addItem = (field:keyof typeof profile, value:string) => {
    if (value.trim()) {
      setProfile(prev => ({
        ...prev,
        [field]:[...(prev[field] as string[]), value.trim()]  
      }));
      setNewItem(prev => ({
        ...prev,
        [field.toLowerCase()]: ''
      }));
    }
  };

  const removeItem = (field:keyof typeof profile, index:number) => {
    setProfile(prev => ({
      ...prev,
      [field]:(prev[field] as string[]).filter((_, i) => i !== index) 
    }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4 bg-green-50">
            <AlertTitle>{success}</AlertTitle>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name *</label>
              <Input
                value={profile.firstName}
                onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name *</label>
              <Input
                value={profile.lastName}
                onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Profession</label>
            <Input
              value={profile.profession || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, profession: e.target.value }))}
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={profile.bio || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself"
              className="h-32"
            />
          </div>

         
          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <div className="flex gap-2">
              <Input
                value={newItem.skill}
                onChange={(e) => setNewItem(prev => ({ ...prev, skill: e.target.value }))}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', newItem.skill))}
              />
              <Button 
                type="button"
                onClick={() => addItem('skills', newItem.skill)}
                className="whitespace-nowrap"
              >
                Add Skill
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeItem('skills', index)}
                    className="hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

         
          <div className="space-y-2">
            <label className="text-sm font-medium">Experience</label>
            <div className="flex gap-2">
              <Input
                value={newItem.experience}
                onChange={(e) => setNewItem(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Add work experience"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('experience', newItem.experience))}
              />
              <Button 
                type="button" 
                onClick={() => addItem('experience', newItem.experience)}
                className="whitespace-nowrap"
              >
                Add Experience
              </Button>
            </div>
            <div className="mt-2">
              {profile.experience.map((exp, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span>{exp}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem('experience', index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

        
          <div className="space-y-2">
            <label className="text-sm font-medium">Education</label>
            <div className="flex gap-2">
              <Input
                value={newItem.education}
                onChange={(e) => setNewItem(prev => ({ ...prev, education: e.target.value }))}
                placeholder="Add education"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('education', newItem.education))}
              />
              <Button 
                type="button" 
                onClick={() => addItem('education', newItem.education)}
                className="whitespace-nowrap"
              >
                Add Education
              </Button>
            </div>
            <div className="mt-2">
              {profile.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span>{edu}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem('education', index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
 
          <div className="space-y-2">
            <label className="text-sm font-medium">Achievements</label>
            <div className="flex gap-2">
              <Input
                value={newItem.achievement}
                onChange={(e) => setNewItem(prev => ({ ...prev, achievement: e.target.value }))}
                placeholder="Add achievement"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('achievements', newItem.achievement))}
              />
              <Button 
                type="button" 
                onClick={() => addItem('achievements', newItem.achievement)}
                className="whitespace-nowrap"
              >
                Add Achievement
              </Button>
            </div>
            <div className="mt-2">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span>{achievement}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem('achievements', index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

         
          <div className="space-y-2">
            <label className="text-sm font-medium">Social Links</label>
            <div className="flex gap-2">
              <Input
                type="url"
                value={newItem.socialLink}
                onChange={(e) => setNewItem(prev => ({ ...prev, socialLink: e.target.value }))}
                placeholder="Add social link (https://...)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('socialLinks', newItem.socialLink))}
              />
              <Button 
                type="button" 
                onClick={() => addItem('socialLinks', newItem.socialLink)}
                className="whitespace-nowrap"
              >
                Add Link
              </Button>
            </div>
            <div className="mt-2">
              {profile.socialLinks.map((link, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {link}
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => removeItem('socialLinks', index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;