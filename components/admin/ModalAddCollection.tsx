"use client"
import { Backdrop, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, Menu, MenuItem, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { FormEvent, useEffect, useState } from 'react'
import AdminFormFieldText from './form-field/AdminFormFieldText'
import AdminAddFieldText from './add-form-filed/AdminAddFieldText'
import { v4 } from 'uuid'
import AdminAddFieldRichText from './add-form-filed/AdminAddFieldRichText'
import AdminAddFieldNumber from './add-form-filed/AdminAddFieldNumber'
import AdminAddFieldBool from './add-form-filed/AdminAddFieldBool'
import AdminAddFieldEmail from './add-form-filed/AdminAddFieldEmail'
import AdminAddFieldUrl from './add-form-filed/AdminAddFieldUrl'
import AdminAddFieldDateTime from './add-form-filed/AdminAddFieldDateTime'
import AdminAddFieldSelect from './add-form-filed/AdminAddFieldSelect'
import AdminAddFieldFile from './add-form-filed/AdminAddFieldFile'
import AdminAddFieldRelation from './add-form-filed/AdminAddFieldRelation'
import AdminAddFieldJson from './add-form-filed/AdminAddFieldJson'

type ComponentType = {
  open: boolean,
  onClose: () => void
}

export const DATA_FIELDS = [
  {
    fieldName: "Plain text",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 8h2V6h3.252L7.68 18H5v2h8v-2h-2.252L13.32 6H17v2h2V4H5z"></path></svg>',
    datatype: 'VARCHAR(255)'
  },
  {
    fieldName: "Rich text",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>',
    datatype: 'TEXT'
  },
  {
    fieldName: "Number",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z"></path></svg>',
    datatype: 'DOUBLE'
  },
  {
    fieldName: "Bool",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 9c-1.628 0-3 1.372-3 3s1.372 3 3 3 3-1.372 3-3-1.372-3-3-3z"></path><path d="M16 6H8c-3.296 0-5.982 2.682-6 5.986v.042A6.01 6.01 0 0 0 8 18h8c3.309 0 6-2.691 6-6s-2.691-6-6-6zm0 10H8a4.006 4.006 0 0 1-4-3.99C4.004 9.799 5.798 8 8 8h8c2.206 0 4 1.794 4 4s-1.794 4-4 4z"></path></svg>',
    datatype: 'VARCHAR(1)'
  },
  {
    fieldName: "Email",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg>',
    datatype: 'VARCHAR(255)'
  },
  {
    fieldName: "Url",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.222 19.778a4.983 4.983 0 0 0 3.535 1.462 4.986 4.986 0 0 0 3.536-1.462l2.828-2.829-1.414-1.414-2.828 2.829a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.829-2.828-1.414-1.414-2.829 2.828a5.006 5.006 0 0 0 0 7.071zm15.556-8.485a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0L9.879 7.051l1.414 1.414 2.828-2.829a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.829 2.828 1.414 1.414 2.829-2.828z"></path><path d="m8.464 16.95-1.415-1.414 8.487-8.486 1.414 1.415z"></path></svg>',
    datatype: 'VARCHAR(255)'
  },
  {
    fieldName: "Datetime",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"></path><path d="M7 10v2h10V9H7z"></path></svg>',
    datatype: 'DATETIME'
  },
  {
    fieldName: "Select",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path></svg>',
    datatype: 'VARCHAR(255)'
  },
  {
    fieldName: "File",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="7.499" cy="9.5" r="1.5"></circle><path d="m10.499 14-1.5-2-3 4h12l-4.5-6z"></path><path d="M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-16 14V6h16l.002 12H3.999z"></path></svg>',
    datatype: 'VARCHAR(255)'
  },
  {
    fieldName: "Relation",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15C13.6941 9 12.5831 8.16562 12.171 7.0009L11 7C9.9 7 9 7.9 9 9L9.0009 9.17102C10.1656 9.58312 11 10.6941 11 12C11 13.3059 10.1656 14.4169 9.0009 14.829L9 15C9 16.1 9.9 17 11 17L12.1707 17.0001C12.5825 15.8349 13.6937 15 15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21H15C13.6941 21 12.5831 20.1656 12.171 19.0009L11 19C8.79 19 7 17.21 7 15H5C3.34315 15 2 13.6569 2 12C2 10.3431 3.34315 9 5 9H7C7 6.79086 8.79086 5 11 5L12.1707 5.00009C12.5825 3.83485 13.6937 3 15 3H18ZM18 17H15C14.4477 17 14 17.4477 14 18C14 18.5523 14.4477 19 15 19H18C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17ZM8 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H8C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11ZM18 5H15C14.4477 5 14 5.44772 14 6C14 6.55228 14.4477 7 15 7H18C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"></path></svg>',
    datatype: 'VARCHAR(255)'
  },
  {
    fieldName: "JSON",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 22h1v-2h-.989C8.703 19.994 6 19.827 6 16c0-1.993-.665-3.246-1.502-4C5.335 11.246 6 9.993 6 8c0-3.827 2.703-3.994 3-4h1V2H8.998C7.269 2.004 4 3.264 4 8c0 2.8-1.678 2.99-2.014 3L2 13c.082 0 2 .034 2 3 0 4.736 3.269 5.996 5 6zm13-11c-.082 0-2-.034-2-3 0-4.736-3.269-5.996-5-6h-1v2h.989c.308.006 3.011.173 3.011 4 0 1.993.665 3.246 1.502 4-.837.754-1.502 2.007-1.502 4 0 3.827-2.703 3.994-3 4h-1v2h1.002C16.731 21.996 20 20.736 20 16c0-2.8 1.678-2.99 2.014-3L22 11z"></path></svg>',
    datatype: 'TEXT'
  },
]

const ModalAddCollection: React.FC<ComponentType> = ({open, onClose}) => {
  const onCloseModal = () => {
    if (data.length > 0) {
      setHasCloseModal(true)
    }
    else {
      onClose()
    }
  }

  const [hasCloseModal, setHasCloseModal] = useState(false)

  const changeHasCloseModal = () => {
    setHasCloseModal(false)
    onClose()
    setData([])
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openFileds = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [widthFileds, setWidthFileds] = useState(0)
  useEffect(() => {
    if (anchorEl) {
      setWidthFileds(anchorEl.offsetWidth)
    }
  }, [anchorEl])

  const [data, setData] = useState<{id: string, field: string, name: string, }[]>([])

  const addField = (fieldName: string) => {
    setData(state => [...state, {
      id: v4(),
      name: "field",
      field: fieldName,
    }])
    handleClose()
  }

  const onDeleteField = (id: string) => {
    setData(state => state.filter(v => v.id != id))
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setData(state => state.map(v => {
      if (v.id == id) {
        v.name = e.target.value
      }

      return v
    }))
  }

  // create collection
  const [loading, setLoading] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (loading) return
      setLoading(true)

      const { name } = Object.fromEntries(
        new FormData(e.target as HTMLFormElement),
      );

      const res = await fetch('/api/admin/database/create', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          fields: data
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })

      if (!res.ok) throw "Error"

      const body = await res.json()

      console.log({body})
      onClose()
      setData([])
      
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Drawer
        anchor='right'
        open={open}
        onClose={onCloseModal}
      >
        <form className='w-[700px] max-w-[100vw] flex flex-col h-full' onSubmit={submit}>
          <div className="flex-none bg-gray-100 py-6 px-8">
            <h3 className='text-xl'>New Collection</h3>
            <AdminFormFieldText title='name' name='name' required placeholder='eg. "posts' className='mt-6' />
          </div>
          <div className="flex-grow min-h-0 overflow-y-auto py-6 px-8 flex flex-col space-y-4">
            <div className='text-sm'>System fields: <Chip label="id" size='small'/>,
              <Chip label="createdAt" size='small'/>,
              <Chip label="updatedAt" size='small'/>.
            </div>
            {data.map(v => {
              switch(v.field) {
                case 'Plain text':
                  return <AdminAddFieldText key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'Rich text':
                  return <AdminAddFieldRichText key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'Number':
                  return <AdminAddFieldNumber key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'Bool':
                  return <AdminAddFieldBool key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'Email':
                  return <AdminAddFieldEmail key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'Url':
                  return <AdminAddFieldUrl key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'Datetime':
                  return <AdminAddFieldDateTime key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'Select':
                  return <AdminAddFieldSelect key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'File':
                  return <AdminAddFieldFile key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'Relation':
                  return <AdminAddFieldRelation key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                case 'JSON':
                  return <AdminAddFieldJson key={v.id} onChange={(e) => onChangeField(e, v.id)} onDelete={() => onDeleteField(v.id)} />
                default:
                  return null;
              }
            })}
            <Button className='w-full' variant="outlined" style={{borderWidth: 2, borderColor: grey[900]}} startIcon={(
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
              </span>
            )} onClick={handleClick}>
              New Fields
            </Button>
            <Menu
              MenuListProps={{
                // "aria-labelledby": "basic-button",
                sx: { width: widthFileds }
              }}
              anchorEl={anchorEl}
              open={openFileds}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <div className="w-full grid grid-cols-4 px-2 text-sm">
                {DATA_FIELDS.map((v,i) =>
                  <div key={i} className="px-2 py-2 rounded flex items-center space-x-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => addField(v.fieldName)}
                  >
                    <span className="icon" dangerouslySetInnerHTML={{__html: v.icon}}></span>
                    <span>{v.fieldName}</span>
                  </div>
                )}
              </div>
            </Menu>
          </div>
          <div className="flex-none py-6 px-8 flex justify-end space-x-4 border-t">
            <Button variant="text" onClick={onCloseModal}>Cancel</Button>
            <Button variant="contained" type='submit'>Create</Button>
          </div>
        </form>
      </Drawer>
      <Dialog
        open={hasCloseModal}
        keepMounted
        onClose={() => setHasCloseModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Close the panel</DialogTitle>
        <DialogContent>
          You have unsaved changes. Do you really want to close the panel?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHasCloseModal(false)}>No</Button>
          <Button variant='contained' color='error' onClick={changeHasCloseModal}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default ModalAddCollection