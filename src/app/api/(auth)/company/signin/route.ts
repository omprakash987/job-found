import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient(); 


export async function POST(req:NextRequest,res:NextResponse){


    try {
        const {email,password} = await req.json();

        if(!email || !password){
            toast.error("email and password are required");
            return NextResponse.json({
                message:"email and password are required"
            },{status:400}) 
        }


        const companyProfile = await prisma.company.findUnique({
            where:{
                email
            }
        })

        if(!companyProfile){
            toast.error("company not found");
            return NextResponse.json({
                message:"company not found"
            },{status:404})
        }

        const isPasswordMatched = await bcrypt.compare(password,companyProfile.password); 
        if(!isPasswordMatched){
            toast.error("invalid password");
            return NextResponse.json({
                message:"invalid password"
            },{status:400})

        }

        const company_token = jwt.sign({
            id:companyProfile.id,
            email:companyProfile.email
        },
        process.env.COMPANY_JWT_SECRET as string,
        {expiresIn:"1d"}
    ); 

    const response = NextResponse.json({
        message:"company logged in successfully",
        company_token:company_token
    })
    response.cookies.set("company_token",company_token,{
         httpOnly:true
    }); 

    return response; 
    

        
    } catch (error:any) {
        console.log(error); 
        return NextResponse.json({
            message:"error doing signin"
        })
        
    }
}