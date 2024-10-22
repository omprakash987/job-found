import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,res:NextResponse){
   try {
    const response = NextResponse.json({
        message:"user loged out", 
        success:true
    }); 
    response.cookies.set('token','',{
        httpOnly:true,expires:new Date(0)
    })
    return response
    
   } catch (error) {

    return NextResponse.json({
        message:"something went wrong from logout route",
        success:false
    })
    
   }

}