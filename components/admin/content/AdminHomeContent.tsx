"use client"
import { Box, IconButton, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, tableCellClasses } from '@mui/material'
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import styled from '@emotion/styled';
import Link from 'next/link';
import IconCog from '@/components/icons/IconCog';
import IconRefresh from '@/components/icons/IconRefresh';
import { grey } from '@mui/material/colors';
import IconSearch from '@/components/icons/IconSearch';
import FormIOSSwitch from '@/components/FormIOSSwitch';
import type { DataType, DataRow } from "prisma/prisma-client";
import { revalidatePath, revalidateTag } from 'next/cache';
import { v4 } from 'uuid';
import ModalAddRecord from '../ModalAddRecord';
import { useRouter } from 'next/navigation';

type ComponentType = {
  data: any[],
  dataType: DataType & {
    dataRows: DataRow[]
  }
}

const AdminHomeContent: React.FC<ComponentType> = ({data, dataType}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openFileds = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const columns = [{
    id: v4(),
    name: 'id',
    width: 'auto'
  }, ...dataType.dataRows.map(v => ({id: v.id, name: v.name, width: 'auto'})).concat({
    id: v4(),
    name: 'createdAt',
    width: '1px'
  }, {
    id: v4(),
    name: 'updatedAt',
    width: '1px'
  })];

  // const data = new Array(30).fill(0).map((v,i) => ({ id: i, name: "Viet Hung", age: 25, gender: "Nam"}))

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const router = useRouter()
  const test = () => {
    // revalidateTag('admin')
    
    router.refresh()
  }

  const [isOpenAddRecord, setIsOpenAddRecord] = useState(false)

  return (
    <div className='w-full h-full p-6 overflow-y-auto'>
      <button onClick={test}>click</button>
      <section className="flex items-center space-x-4">
        <div className="text-xl">
          <span className='text-gray-500'>Collections</span> <span className='px-3 select-none'>/</span>
          <span>{dataType.name}</span>
        </div>
        <span className="icon p-2 w-10 h-10 rounded-full hover:bg-gray-200 cursor-pointer">
          <IconCog />
        </span>
        <span className="icon p-2 w-10 h-10 rounded-full hover:bg-gray-200 cursor-pointer">
          <IconRefresh />
        </span>

        <div className='!ml-auto'></div>

        <Button variant="outlined" style={{borderWidth: 2, borderColor: grey[900]}} startIcon={(
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path></svg>
          </span>
        )}>API Preview</Button>
        
        <Button variant="contained" startIcon={(
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
          </span>
        )} onClick={() => setIsOpenAddRecord(true)}>
          New Records
        </Button>
      </section>

      <section className='mt-8 flex items-center space-x-4'>
        <div className="w-full rounded-full bg-gray-200 px-4 py-3 flex items-center space-x-3">
          <span className="flex-none icon"><IconSearch /></span>
          <input type="text" className='flex-grow min-w-0' placeholder='Search ...' />
        </div>
      </section>

      <section className='mt-8'>
        <Paper sx={{ width: '100%' }} className='rounded overflow-hidden'>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell style={{width: '0px'}} align="left"><input type="checkbox" /></TableCell>
                  {columns.map((v) => (
                    <TableCell
                      key={v.id}
                      align="left"
                      // width={column?.width || 'auto'}
                      style={{width: v.width}}
                    >
                      {v.name}
                    </TableCell>
                  ))}
                  <TableCell align="right" style={{width: '0px', whiteSpace: 'nowrap'}}>
                    <button className='p-2 rounded hover:bg-gray-200' onClick={handleClick}>
                      <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path></svg>
                      </span>
                    </button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openFileds}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <div className="px-4">
                        <p className='text-sm'>Toggle columns</p>
                        <div className="flex flex-col">
                          {columns.filter(v => v.name != 'id').map((v,i) =>
                            <div key={i} className="flex items-center">
                              <FormIOSSwitch label={v.name} size='small' />
                            </div>
                          )}
                        </div>
                      </div>
                    </Menu>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="left"><input type="checkbox" /></TableCell>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.image}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="right">
                      <div className="flex space-x-1 items-center">
                        
                        <Button color='warning' variant='contained' size='small' startIcon={(
                          <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path><path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path></svg>
                          </span>
                        )}>Xem</Button>
                        <Button color='primary' variant='contained' size='small' startIcon={(
                          <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path><path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path></svg>
                          </span>
                        )}>Sửa</Button>
                        <Button color='error' variant='contained' size='small' startIcon={(
                          <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                          </span>
                        )}>Xóa</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                { data.length == 0 
                  ? <TableRow>
                    <TableCell colSpan={"100%" as any} className='text-center'>
                      <div className="flex flex-col items-center space-y-4">
                        <span>Không có bản ghi nào</span>
                        <Button variant="outlined" startIcon={(
                          <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                          </span>
                        )} onClick={() => setIsOpenAddRecord(true)}>
                          New Records
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow> : null
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </section>

      <ModalAddRecord dataType={dataType} open={isOpenAddRecord} onClose={() => setIsOpenAddRecord(false)} />
    </div>
  )
}

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#3e3e3e",
//     color: "white",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: "#0000000a",
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

export default AdminHomeContent