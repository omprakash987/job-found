 
'use client'

import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Loader2, Building2, MapPin, Calendar, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  salary?: string;
  location?: string;
  type: string;
  experience: string;
  endDate: string;
  company: {
    profile: {
      name: string;
      logo?: string;
    } | null;
  };
  createdAt: string;
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const router = useRouter();

  useEffect(() => {
    fetchJobDetails();
  }, [params?.id]);

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(`/api/company/create-jobs/${params.id}`);
      if (!response.ok) {
        console.log("error yaha se hai ")
        throw new Error('Failed to fetch job details');
      }
      const data = await response.json();
      setJob(data);
    } catch (error) {
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setApplying(true);
    setApplicationStatus({});

    try {
      const response = await fetch('/api/jobs/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: parseInt(params.id)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setApplicationStatus({
        success: true,
        message: 'Application submitted successfully!'
      });

      // Redirect to applications page after successful submission
      setTimeout(() => {
        router.push('/jobs/applied');
      }, 2000);

    } catch (error) {
      setApplicationStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit application'
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Job not found'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
              <div className="flex items-center mt-2 text-gray-600">
                <Building2 className="w-4 h-4 mr-2" />
                <span>{job.company.profile?.name}</span>
              </div>
            </div>
            
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {applicationStatus.message && (
            <Alert variant={applicationStatus.success ? "default" : "destructive"}>
              <AlertDescription>{applicationStatus.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-wrap gap-4 text-sm">
            {job.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{job.location}</span>
              </div>
            )}
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              <span>{job.type.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Apply by {new Date(job.endDate).toLocaleDateString()}</span>
            </div>
            {job.salary && (
              <div className="flex items-center text-green-600 font-medium">
                {job.salary}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="list-disc list-inside space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-600">{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Experience Required</h3>
            <p className="text-gray-600">{job.experience}</p>
          </div>

          <Button 
            onClick={handleApply} 
            className="w-full"
            disabled={applying}
          >
            {applying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {applying ? 'Submitting Application...' : 'Apply for this Position'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}