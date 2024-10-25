



import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

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

export async function GET(request: NextRequest) {
  try {
    const company = getCompanyFromToken(request);
    if (!company) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.jobApplication.findMany({
      where: {
        job: {
          companyId: company.id,
        },
      },
      include: {
        job: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
