 

"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface JobApplication {
  id: number;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    resume?: string;
  };
  job: {
    title: string;
    description: string;
  };
}

export default function CompanyApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/company/applications");
      console.log("application response : " , response);
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((application) => (
          <Card key={application.id} className="mb-4">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{application.job.title}</CardTitle>
              <p className="text-gray-600">{application.job.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Applicant details:</h3>
              
                <p>Email: {application.user.email}</p>
              </div>

              <div>
                <h3 className="font-semibold">Application Status:</h3>
                <p>{application.status}</p>
              </div>

              <div>
                <h3 className="font-semibold">Applied On:</h3>
                <p>{new Date(application.createdAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
