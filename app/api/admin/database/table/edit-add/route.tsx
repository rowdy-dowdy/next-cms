import { FieldNameType } from '@/lib/admin/fields';
import { useCurrentUserAdmin } from '@/lib/server/helperServer';
import db from '@/lib/server/prismadb';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { DataRow } from 'prisma/prisma-client';

type FieldType = (Omit<DataRow, 'field'> & {
  value: any
  field: FieldNameType
})[]

export async function POST(request: NextRequest) {
  try {
    const user = await useCurrentUserAdmin(request)
    if (!user) return NextResponse.json("Unauthorized", {status: 401})

    const { name, fields } : { name: string, fields: FieldType } = await request.json()

    if (!name) {
      return NextResponse.json("Error", { status: 400 })
    }
    
    // const dataType = await db.dataType.findFirst({
    //   where: {
    //     name: name
    //   },
    //   include: {
    //     dataRows: true
    //   }
    // })

    let sql = `insert into ${name} (${fields.map(v => v.name).join(',')}) values(${fields.reduce((pre,cur,i) => {
      if (i > 0) pre+= ','

      if (cur.field == "Bool") {
        pre += `${cur.value != "on"}`
      }
      else {
        pre += `'${cur.value}'`
      }

      return pre
    },'')})`

    console.log({sql})

    await db.$executeRawUnsafe(sql)

    return NextResponse.json({ message: "Mission Successfully Completed" });
  }
  catch (e) {
    console.log(e)
    return NextResponse.json("Error", {status: 400})
  }
}