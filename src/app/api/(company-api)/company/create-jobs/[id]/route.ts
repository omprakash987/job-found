 

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = parseInt(params.id);

    
    if (isNaN(jobId)) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }

    
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: {
          include: {
            profile: true,
          },
        },
      },
    });

    
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("Error fetching job details:", error);
    return NextResponse.json(
      { message: "Failed to fetch job details" },
      { status: 500 }
    );
  }
}
