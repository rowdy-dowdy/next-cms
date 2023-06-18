import { DATA_FIELDS } from '@/lib/admin/fields';
import db from '@/lib/server/prismadb';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

const checkField = (
  name: string | null,
  fields: {
    id: string;
    field: string; 
    name: string
  }[]
) => {
  if (name == null) return false

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
    var { name, fields }: 
    {
      name: string, 
      fields: {
        id: string;
        field: string;
        name: string
      }[]
    } = await request.json()

    if (!checkField(name, fields)) {
      return NextResponse.json({ message: 'Error' }, {status: 400});
    }

    let sql = `create table ${name} (${fields.reduce((pre,cur,i) => {
      if (i > 0) pre+= ','
      else {
        pre += `id integer primary key autoincrement, createdAt datetime NOT NULL DEFAULT current_timestamp, updatedAt datetime NOT NULL DEFAULT current_timestamp,`
      }

      let datatype = DATA_FIELDS.find(v => v.fieldName == cur.field)?.datatype
      pre += `${cur.name} ${datatype}`

      return pre
    },'')})`

    let sqlUpdateAt = `
      CREATE TRIGGER tg_${name}_updated_at
      AFTER UPDATE
      ON ${name} FOR EACH ROW
      BEGIN
        UPDATE ${name} SET updatedAt = current_timestamp
          WHERE id = old.id;
      END
    `

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
      db.$executeRawUnsafe(sql),
      db.$executeRawUnsafe(sqlUpdateAt)
    ])

    revalidatePath('/admin')

    return NextResponse.json({ data: dataType });
  }
  catch (e) {
    console.log(e)
    return NextResponse.json("Error", {status: 400})
  }
}