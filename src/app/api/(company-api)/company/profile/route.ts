import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 

const prisma = new PrismaClient();

const getCompanyFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("company_token")?.value;
    console.log("company_token ", token);
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.COMPANY_JWT_SECRET as string) as {
      id: number;
      email: string;
    };
    console.log("company decoded_token ", decoded);
    
    return decoded;
  } catch (error) {
    return null;
  }
};

 
export async function GET(request: NextRequest) {
  try {
    const company = getCompanyFromToken(request);
    if (!company) {
        console.log("Unauthorized from profile page");
      return NextResponse.json({ message: "Unauthorized from profile page " }, { status: 401 });
    }

    const profile = await prisma.companyProfile.findUnique({
      where: {
        companyId: company.id,
      },
    });

    if (!profile) {
      console.log("profile not found from route api"); 
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      message:"profile found", 
      profile,
    },{status:200});

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch company profile" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const company = getCompanyFromToken(request);
    if (!company) {
      console.log("Unauthorized from route page");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      description,
      industry,
      size,
      foundedYear,
      website,
      location,
      logo,
      socialLinks,
    } = await request.json();

    if(!name || !description || !industry || !size || !foundedYear || !website || !location || !logo || !socialLinks){
      
      console.log("All fields are required");
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingProfile = await prisma.companyProfile.findUnique({
      where: {
        companyId: company.id,
      },
    });

    if (existingProfile) {
      return NextResponse.json(
        { message: "Profile already exists" },
        { status: 400 }
      );
    }

    const profile = await prisma.companyProfile.create({
      data: {
        companyId: company.id,
        name,
        description,
        industry,
        size,
        foundedYear,
        website,
        location,
        logo,
        socialLinks,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.log("error : " , error )

    return NextResponse.json(
      { message: "Failed to create company profile" },
      { status: 500 }
    );
  }
}

 
export async function PUT(request: NextRequest) {
  try {
    const company = getCompanyFromToken(request);
    if (!company) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      description,
      industry,
      size,
      foundedYear,
      website,
      location,
      logo,
      socialLinks,
    } = await request.json();

     
    const profile = await prisma.companyProfile.update({
      where: {
        companyId: company.id,
      },
      data: {
        name,
        description,
        industry,
        size,
        foundedYear,
        website,
        location,
        logo,
        socialLinks,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("error : " , error )
    return NextResponse.json(
      { message: "Failed to update company profile" },
      { status: 500 }
    );
  }
}
