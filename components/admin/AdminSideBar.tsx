"use client"

import { Divider, Menu, MenuItem } from '@mui/material'
import React from 'react'
import type { UserAdminType } from "@/lib/server/helperServer";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const AdminSideBar: React.FC<{
  user: NonNullable<UserAdminType>
}> = ({
  user
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pathname = usePathname()

  return (
    <div className="h-full flex bg-white">
      <div className="p-4 border-r flex flex-col space-y-6">
        <Link href="/admin" className="block w-10 h-10 rounded overflow-hidden">
          <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
        </Link>

        <div className="!mt-7"></div>

        <Link href="/admin" className={`icon w-10 h-10 rounded-xl p-1.5 hover:bg-gray-200 border-2 border-transparent ${pathname == '/admin' ? "!border-gray-800" : ""}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 6c0-2.168-3.663-4-8-4S4 3.832 4 6v2c0 2.168 3.663 4 8 4s8-1.832 8-4V6zm-8 13c-4.337 0-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3c0 2.168-3.663 4-8 4z"></path><path d="M20 10c0 2.168-3.663 4-8 4s-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3z"></path></svg>
        </Link>

        <Link href="/admin/logs" className={`icon w-10 h-10 rounded-xl p-1.5 hover:bg-gray-200 border-2 border-transparent
          ${pathname == '/admin/logs' ? "!border-gray-800" : ""}
        `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3H3z"></path><path d="M15.293 14.707a.999.999 0 0 0 1.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a.999.999 0 0 0-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z"></path></svg>
        </Link>

        <Link href="/admin/settings" className={`icon w-10 h-10 rounded-xl p-1.5 hover:bg-gray-200 border-2 border-transparent ${pathname == '/admin/settings' ? "!border-gray-800" : ""}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path><path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path></svg>
        </Link>

        <div className="!mt-auto">
          <div 
            id="userImage" 
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 select-none cursor-pointer"
            onClick={(e) => handleClick(e)}
          >
            <img src={user.image || ""} alt="logo" className="w-full h-full object-contain" />
          </div>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem><Link href="/admin">Bảng điều khiển</Link></MenuItem>
            <MenuItem><Link href="/admin">Nhật ký</Link></MenuItem>
            <MenuItem><Link href="/admin">Cài đặt</Link></MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} className='space-x-2 !text-red-600'>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg>
              </span>
              <span className="">Đăng xuất</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default AdminSideBar
