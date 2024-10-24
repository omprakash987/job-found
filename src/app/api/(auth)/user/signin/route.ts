import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                message: "Email and password are required"
            }, { status: 400 })


        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return NextResponse.json({
                message: "Invalid password"
            }, { status: 400 })
        }

        const job_token = jwt.sign({
            id: user.id,
            email: user.email,

        }, process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )

        const response = NextResponse.json({
            message: 'User logged in successfully',
            job_token: job_token,
        });

        response.cookies.set("job_token",job_token,{
            httpOnly:true,
        })
        return response

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong"
        }, { status: 500 })
    }
}