'use client'; 



import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

 


const JobForm = () => {
  const [loading, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [job, setJob] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    type: 'FULL_TIME',
    experience: '',
    endDate: ''
  });

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    const newRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(newRequirements);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/company/create-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...job,
          requirements: requirements.filter(req => req.trim() !== '')
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create job');
      }

       
      setJob({
        title: '',
        description: '',
        salary: '',
        location: '',
        type: 'FULL_TIME',
        experience: '',
        endDate: ''
      });
      setRequirements(['']);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create job');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-9/12 h-full mx-auto">
      <CardHeader>
        <CardTitle>Create New Job</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title</label>
            <Input
              name="title"
              value={job.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Requirements</label>
            {requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={req}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  placeholder="Add requirement"
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeRequirement(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRequirement}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Requirement
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Type</label>
            <Select 
              value={job.type} 
              onValueChange={(value) => setJob(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">Full Time</SelectItem>
                <SelectItem value="PART_TIME">Part Time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Salary (Optional)</label>
            <Input
              name="salary"
              value={job.salary}
              onChange={handleChange}
              placeholder="e.g., $50,000 - $70,000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location (Optional)</label>
            <Input
              name="location"
              value={job.location}
              onChange={handleChange}
              placeholder="e.g., New York, NY"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Required</label>
            <Input
              name="experience"
              value={job.experience}
              onChange={handleChange}
              required
              placeholder="e.g., 2+ years"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Application End Date</label>
            <Input
              type="date"
              name="endDate"
              value={job.endDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Creating...' : 'Create Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};


export default JobForm; 
