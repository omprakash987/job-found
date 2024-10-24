import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

 
type JobCreateInput = {
  title: string;
  description: string;
  requirements: string[];
  salary?: string;
  location?: string;
  type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
  experience: string;
  endDate: string;
};

const getCompanyFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("company_token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.COMPANY_JWT_SECRET as string) as {
      id: number;
      email: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    const company = getCompanyFromToken(request);
    if (!company) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json() as JobCreateInput;
    
   
    if (!body.title || !body.description || !body.type || !body.experience || !body.endDate) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        title: body.title,
        description: body.description,
        requirements: body.requirements,
        salary: body.salary,
        location: body.location,
        type: body.type,
        experience: body.experience,
        endDate: new Date(body.endDate),
      },
      include: {
        company: {
          include: {
            profile: true
          }
        }
      }
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: {
          include: {
            profile: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}