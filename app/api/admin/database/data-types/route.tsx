import db from '@/lib/server/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const dataTypes = await db.dataType.

    return NextResponse.json({ data: dataType });
  }
  catch (e) {
    console.log(e)
    return NextResponse.json("Error", {status: 400})
  }
}