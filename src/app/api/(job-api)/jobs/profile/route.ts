import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


const getUserFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("job_token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
};

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      firstName,
      lastName,
      profession,
      bio,
      skills,
      experience,
      education,
      achievements,
      socialLinks,
    } = await request.json();

    const existingProfile = await prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (existingProfile) {
      return NextResponse.json(
        { message: "Profile already exists" },
        { status: 400 }
      );
    }

    const profile = await prisma.userProfile.create({
      data: {
        userId: user.id,
        firstName,
        lastName,
        profession,
        bio,
        skills,
        experience,
        education,
        achievements,
        socialLinks,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      firstName,
      lastName,
      profession,
      bio,
      skills,
      experience,
      education,
      achievements,
      socialLinks,
    } = await request.json();

    const profile = await prisma.userProfile.update({
      where: {
        userId: user.id,
      },
      data: {
        firstName,
        lastName,
        profession,
        bio,
        skills,
        experience,
        education,
        achievements,
        socialLinks,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}