import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
  const cookieStore = await cookies();
  if(cookieStore.get('token')?.value) cookieStore.delete('token');
  return NextResponse.json({success: true});
}