"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { DataType } from "prisma/prisma-client";

type ComponentType = {
  children: React.ReactNode,
  data: DataType[]
}

const NestedLayoutHomeAdmin = (props: ComponentType): JSX.Element => {
  const { children, data } = props

  const router = useRouter()

  useEffect(() => {
    if (data.length > 0) {
      router.replace(`/admin/` + data[0].name)
    }
  }, [])

  return <>{children}</>
}

export default NestedLayoutHomeAdmin