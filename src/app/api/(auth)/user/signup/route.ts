import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';



const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {

    try {

        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const existedUser = await prisma.user.findFirst({
            where: {
                email,
            }
        })

        if (existedUser) {
            return NextResponse.json({
                message: "User already existed"
            }, { status: 400 })
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,

            }
        })

        

        const response = NextResponse.json({
            message: 'User created successfully',
            user,
             
        });

        return response;

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong"
        }, { status: 500 })
    }

}