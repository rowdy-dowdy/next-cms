import { DATA_FIELDS } from '@/components/admin/ModalAddCollection';
import db from '@/lib/server/prismadb';
import { NextResponse } from 'next/server';

const checkField = (
  fields: {
    id: string;
    field: string; 
    name: string
  }[]
) => {
  let arr: string[] = []

  for(const field of fields) {
    if (arr.includes(field.name)) {
      return false
    }
    else {
      arr.push(field.name)
    }
  }

  return true
}

export async function POST(request: Request) {
  try {
    const { name, fields }: 
    {
      name: string, 
      fields: {
        id: string;
        field: string;
        name: string
      }[]
    } = await request.json()

    if (!checkField(fields)) {
      return NextResponse.json({ message: 'Error' }, {status: 400});
    }

    let sql = `create table ${name} (${fields.reduce((pre,cur,i) => {
      if (i > 0) pre+= ','

      let datatype = DATA_FIELDS.find(v => v.fieldName == cur.field)?.datatype
      pre += `${cur.name} ${datatype}`

      return pre
    },'')})`

    const [dataType, _] = await db.$transaction([
      db.dataType.create({
        data: {
          name: name,
          dataRows: {
            create: fields.map((v) => ({
              id: v.id,
              name: v.name,
              field: v.field
            }))
          }
        },
        include: {
          dataRows: true
        }
      }),
      db.$executeRawUnsafe(sql)
    ])

    return NextResponse.json({ data: dataType });
  }
  catch (e) {
    console.log(e)
    return NextResponse.json("Error", {status: 400})
  }
}