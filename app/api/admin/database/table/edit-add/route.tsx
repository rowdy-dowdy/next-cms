import { useCurrentUserAdmin } from '@/lib/server/helperServer';
import db from '@/lib/server/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const user = await useCurrentUserAdmin(request)
    if (!user) return NextResponse.json("Unauthorized", {status: 401})

    const data = await request.formData()
    const table = data.get('table') as string
    data.delete('table')

    const value = Object.fromEntries(data)
    
    const dataType = await db.dataType.findFirst({
      where: {
        name: table
      },
      include: {
        dataRows: true
      }
    })

    return NextResponse.json("Error", { status: 400 });

    return NextResponse.json({ data: data });
  }
  catch (e) {
    console.log(e)
    return NextResponse.json("Error", {status: 400})
  }
}