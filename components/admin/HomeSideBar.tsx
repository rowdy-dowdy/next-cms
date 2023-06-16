"use client"
import React, { useState } from 'react'
import ModalAddCollection from './ModalAddCollection'
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import type { DataType } from "prisma/prisma-client";
import Link from 'next/link';

const HomeSideBar: React.FC<{
  data: DataType[]
}> = ({data}) => {
  const [isOpenModalAddCollection, setIsOpenModalAddCollection] = useState(false)

  const closeModalAddCollection = () => {
    setIsOpenModalAddCollection(false)
  }

  const [dataFilter, setDataFilter] = useState<DataType[]>(data)

  return (
    <div className='w-60 h-full bg-white border-r'>
      <div className="px-4 py-6 border-b">
        <input type="text" className='px-2 py-1 hover:!bg-gray-300 focus:!bg-gray-200 rounded' placeholder='Search collection'/>
      </div>
      <div className="flex flex-col space-y-1 px-4 py-4">
        {/* <div className="flex items-center space-x-2 rounded hover:bg-gray-200 p-2 cursor-pointer">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
          </span>
          <span>users</span>
        </div> */}

        {dataFilter.map((v,i) => 
          <Link key={v.id} href={`/admin/${v.name}`} className="flex items-center space-x-2 rounded hover:bg-gray-200 p-2 cursor-pointer">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 5h-8.586L9.707 3.293A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path></svg>
            </span>
            <span>{v.name}</span>
          </Link>
        )}

        {dataFilter.length == 0
          ? <div className='py-4 text-center'>
            No collections found.
          </div> : null
        }

        <Button className='!mt-4' variant="outlined" style={{borderWidth: 2, borderColor: grey[900]}} startIcon={(
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
          </span>
        )} onClick={() => setIsOpenModalAddCollection(true)}>
          New collection
        </Button>
        <ModalAddCollection open={isOpenModalAddCollection} onClose={closeModalAddCollection} />
      </div>
    </div>
  )
}

export default HomeSideBar