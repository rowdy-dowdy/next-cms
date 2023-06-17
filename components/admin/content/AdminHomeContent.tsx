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
import AdminViewFieldText from '../view-form-field/AdminViewFieldText';
import { DATA_FIELDS, FieldNameType } from '@/lib/admin/fields';
import AdminViewFieldRichText from '../view-form-field/AdminViewFieldRichText';
import AdminViewFieldBool from '../view-form-field/AdminViewFieldBool';
import AdminViewFieldDateTime from '../view-form-field/AdminViewFieldDateTime';
import AdminViewFieldId from '../view-form-field/AdminViewFieldId';

type ComponentType = {
  data: any[],
  dataType: DataType & {
    dataRows: DataRow[]
  }
}

type ColumnType = {
  id: string,
  name: string,
  width: 'auto' | string,
  field: FieldNameType
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

  const columns: ColumnType[] = [{
    id: v4(),
    name: 'id',
    width: '1px',
    field: 'ID'
  }, ...dataType.dataRows.map(v => ({id: v.id, name: v.name, field: v.field as FieldNameType, width: 'auto'})).concat({
    id: v4(),
    name: 'createdAt',
    width: '1px',
    field: 'DateTime'
  }, {
    id: v4(),
    name: 'updatedAt',
    width: '1px',
    field: 'DateTime'
  })];

  // const data = new Array(30).fill(0).map((v,i) => ({ id: i, name: "Viet Hung", age: 25, gender: "Nam"}))

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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

  // add record
  const [isOpenAddRecord, setIsOpenAddRecord] = useState(false)
  const [recordEdit, setRecordEdit] = useState<any>(null)

  // view record
  const openRecord = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: any) => {
    // check input event
    if ((e.target as HTMLElement).tagName === 'INPUT') return

    setRecordEdit(row)
    setIsOpenAddRecord(true)
  }

  return (
    <div className='w-full h-full p-6 overflow-y-auto flex flex-col'>
      <section className="flex-none flex items-center space-x-4">
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

      <section className='flex-none mt-8 flex items-center space-x-4'>
        <div className="w-full rounded-full bg-gray-200 px-4 py-3 flex items-center space-x-3">
          <span className="flex-none icon"><IconSearch /></span>
          <input type="text" className='flex-grow min-w-0' placeholder='Search ...' />
        </div>
      </section>

      <section className='flex-grow min-h-0 mt-8'>
        <Paper sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} className='rounded overflow-hidden'>
          <TableContainer sx={{ flexGrow: 1 }}>
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
                      <div className="flex items-center space-x-1">
                        <span className="icon w-4 h-4" dangerouslySetInnerHTML={{__html: DATA_FIELDS.find(v2 => v2.fieldName == v.field)?.icon || ''}}></span>
                        <span>{v.name}</span>
                      </div>
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
                  <StyledTableRow key={row.id} onClick={(e) => openRecord(e, row)}>
                    <TableCell align="left"><input type="checkbox" /></TableCell>
                    {columns.map((v) => (
                      <TableCell key={`${row.id}-${v.id}`} align="left">{
                        {
                          'ID': <AdminViewFieldId value={row[v.name]} />,
                          'Plain text': <AdminViewFieldText value={row[v.name]} />,
                          'Rich text': <AdminViewFieldRichText value={row[v.name]} />,
                          'Number': <AdminViewFieldText value={row[v.name]} />,
                          'Bool': <AdminViewFieldBool value={row[v.name]} />,
                          'Email': <AdminViewFieldText value={row[v.name]} />,
                          'Url': <AdminViewFieldText value={row[v.name]} />,
                          'DateTime': <AdminViewFieldDateTime value={row[v.name]} />,
                          'Select': <AdminViewFieldText value={row[v.name]} />,
                          'File': <AdminViewFieldText value={row[v.name]} />,
                          'Relation': <AdminViewFieldText value={row[v.name]} />,
                          'JSON': <AdminViewFieldText value={row[v.name]} />
                        }[v.field] || null
                      }</TableCell>
                    ))}
                    <TableCell align="right">
                      <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>
                      </span>
                    </TableCell>
                  </StyledTableRow>
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
            sx={{ flex: 'none', borderTop: '1px solid #e0e0e0' }}
            rowsPerPageOptions={[20, 50, 100, { label: 'All', value: -1 }]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </section>

      <ModalAddRecord dataType={dataType} editValue={recordEdit} open={isOpenAddRecord} onClose={() => setIsOpenAddRecord(false)} />
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&': {
    cursor: 'pointer'
  },
  '&:hover': {
    backgroundColor: "#0000000a",
  },
}));

export default AdminHomeContent