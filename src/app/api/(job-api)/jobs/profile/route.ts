import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient(); 
export async function POST(req:NextResponse,res:NextResponse){

    

    try {
        const {firstName,lastName, profession , bio , skills , experience, education, achievements  , socialLinks,userId} = await req.json();
        


        const userprofile = await prisma.userProfile.create({
            data: {
                firstName,
                lastName,
                profession,
                bio,
                skills,
                experience: {
                  create: experience  
                },
                education: {
                  create: education 
                },
                achievements: {
                  create: achievements  
                },
                socialLinks: {
                  create: socialLinks  
                },
                user: {
                  connect: { id: userId }
                }
              }
        })

        const response = NextResponse.json({
            message: 'User profile created successfully',
        });

        return response; 



        
    } catch (error) {
        console.log("error : " , error)
        return NextResponse.json({
            message: "Something went wrong"
        }, { status: 500 })
    }
}

export async function GET(req:NextResponse,res:NextResponse){
  try{
    const profile =await prisma.userProfile.findMany({
      include:{
        user:true,
        experience:true,
        education:true,
        achievements:true,
        socialLinks:true,
      }
    }); 
    return NextResponse.json({
      message:"User profile fetched successfully",
      profile
    },{status:200})

  }catch(error:any){
console.log("error : " , error ); 
return NextResponse.json({
  message:"Something went wrong from profile route get" 
}, { status: 500 })
  }
}