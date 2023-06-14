import db from '@/lib/server/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const dataTypes = await db.dataType.findMany()

    return NextResponse.json({ data: dataTypes });
  }
  catch (e) {
    console.log(e)
    return NextResponse.json("Error", {status: 400})
  }
}