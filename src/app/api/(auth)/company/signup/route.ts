import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt"; 
import toast from "react-hot-toast";

const prisma = new PrismaClient(); 

export async function POST(req:NextRequest,res:NextResponse){

    try {
        

    const {email,password} = await req.json(); 

    const user = await prisma.company.findUnique({
        where:{email}
    })

    if(user){
 
        return NextResponse.json({
            message:"company profile already exists"

        },{status:500}); 
    }

    const hashedPassword = await bcrypt.hash(password,10); 


    const newCompanyProfile = await prisma.company.create({
        data:{
            email,
           password:hashedPassword
        }
    })

    return NextResponse.json({
        
        message:"company profile created successfully",
        newCompanyProfile,
        

    },{status:200}); 

    

        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({
          message:"error creating signup of company",
          error:error.message
        },{status:500})
        
    }

}