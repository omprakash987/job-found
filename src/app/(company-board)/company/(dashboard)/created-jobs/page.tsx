'use client'

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type Job = {
    id: number;
    title: string;
    description: string;
    requirements: string[];
    salary?: string;
    location?: string;
    type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
    experience: string;
    endDate: string;
    company: {
      profile: {
        name: string;
        logo?: string;
      } | null;
    };
    createdAt: string;
  };

const JobList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      fetchJobs();
    }, []);
  
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/company/create-jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      );
    }
  
    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }
  
    return (
      <div className=" flex flex-col w-9/12 p-10  ">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="pt-6 mt-10 w-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company.profile?.name}</p>
                </div>
                
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {job.type.replace('_', ' ')}
                  </span>
                  {job.location && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {job.location}
                    </span>
                  )}
                  {job.salary && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      {job.salary}
                    </span>
                  )}
                </div>
  
                <div className="mt-4">
                  <h4 className="font-medium">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="text-sm">{req}</li>
                    ))}
                  </ul>
                </div>
  
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                   
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  export default JobList;