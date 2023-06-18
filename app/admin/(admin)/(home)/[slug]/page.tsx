import AdminHomeContent from '@/components/admin/content/AdminHomeContent'
import db from '@/lib/server/prismadb'
import { redirect } from 'next/navigation'
import React from 'react'

// export const fetchCache = 'force-no-store'
export const revalidate = 0

const getData = async (name: string) => {
  try {
    const [dataType, data] = await db.$transaction([
      db.dataType.findFirst({
        where: {
          name: name
        },
        include: {
          dataRows: true
        }
      }),
      db.$queryRawUnsafe<any[]>(`select * from ${name}`)
    ])

    return {dataType, data}
  } 
  catch (error) {
    console.log({error})
    return {dataType: null, data: []}
  }
}

type PageType = {
  params: { slug: string }
}

const page = async ({ params }: PageType) => {
  const { dataType, data } = await getData(params.slug)

  if (dataType == null) {
    // redirect('/admin')
    return <div>Không tìm thấy bảng {params.slug}</div>
  }

  return (
    <AdminHomeContent data={data} dataType={dataType} />
  )
}

export default page