import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
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
      userId,
    } = await req.json();

    if (!userId) {
      return NextResponse.json({
        message: "User ID is required",
      }, { status: 400 });
    }

    const userProfile = await prisma.userProfile.upsert({
      where: { userId: parseInt(userId) },
      update: {
        firstName,
        lastName,
        profession,
        bio,
        skills,
        experience: {
          deleteMany: {}, // Delete all current experiences
          create: experience, // Add new experiences
        },
        education: {
          deleteMany: {}, // Delete all current education records
          create: education, // Add new education records
        },
        achievements: {
          deleteMany: {}, // Delete all current achievements
          create: achievements, // Add new achievements
        },
        socialLinks: {
          deleteMany: {}, // Delete all current social links
          create: socialLinks, // Add new social links
        },
      },
      create: {
        firstName,
        lastName,
        profession,
        bio,
        skills,
        experience: {
          create: experience, // Create new experience
        },
        education: {
          create: education, // Create new education records
        },
        achievements: {
          create: achievements, // Create new achievements
        },
        socialLinks: {
          create: socialLinks, // Create new social links
        },
        user: {
          connect: { id: parseInt(userId) }, // Connect to existing user
        },
      },
    });

    return NextResponse.json({
      message: 'User profile updated successfully',
      userProfile,
    });

  } catch (error) {
    console.error("Error during profile update: ", error);
    return NextResponse.json({
      message: "Something went wrong",
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const profile = await prisma.userProfile.findMany({
      include: {
        user: true,
        experience: true,
        education: true,
        achievements: true,
        socialLinks: true,
      },
    });

    return NextResponse.json({
      message: "User profile fetched successfully",
      profile,
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error during profile fetch: ", error);
    return NextResponse.json({
      message: "Something went wrong during profile fetch",
    }, { status: 500 });
  }
}
