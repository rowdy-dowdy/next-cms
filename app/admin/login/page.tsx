import Image from 'next/image'
import React from 'react'
import AdminContentLoginForm from '@/components/admin/content/AdminContentLoginForm'
import { useCurrentUserAdmin } from '@/lib/server/helperServer'
import { redirect } from 'next/navigation'

const page = async () => {
  const user = await useCurrentUserAdmin()

  if (user) {
    redirect('/admin')
  }

  return (
    <div className="w-full h-[1px] min-h-screen flex items-stretch">
      <div className="w-full flex min-h-full h-max">
        <div className="flex w-full items-stretch text-gray-600 overflow-x-hidden">
          <div className="flex w-5/12 items-center justify-center bg-gray-50 px-8 py-8">
            <div className="relative w-full h-full">
              <Image src="/bg-auth.png" alt="auth login" className="absolute w-full h-full object-contain top-0 left-0" width={600} height={600} />
            </div>
          </div>

          <div className="w-7/12 px-20 py-8">
            <div className="flex h-full w-full flex-col justify-center space-y-8">
              <div>
                <h3 className="text-2xl uppercase">LOGIN</h3>
                <h5 className="mt-4 text-4xl font-semibold text-gray-800">Welcome Back</h5>
                <p className="mt-4">Please enter your account details</p>

                <AdminContentLoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page