"use client"
import { Backdrop, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, Menu, MenuItem, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { FormEvent, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { v4 } from 'uuid'
import { DATA_FIELDS } from '@/lib/admin/fields'
import { revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'

const AdminFormFieldText = dynamic(() => import('./form-field/AdminFormFieldText'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldText = dynamic(() => import('./add-form-filed/AdminAddFieldText'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldRichText = dynamic(() => import('./add-form-filed/AdminAddFieldRichText'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldNumber = dynamic(() => import('./add-form-filed/AdminAddFieldNumber'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldBool = dynamic(() => import('./add-form-filed/AdminAddFieldBool'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldEmail = dynamic(() => import('./add-form-filed/AdminAddFieldEmail'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldUrl = dynamic(() => import('./add-form-filed/AdminAddFieldUrl'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldDateTime = dynamic(() => import('./add-form-filed/AdminAddFieldDateTime'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldSelect = dynamic(() => import('./add-form-filed/AdminAddFieldSelect'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldFile = dynamic(() => import('./add-form-filed/AdminAddFieldFile'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldRelation = dynamic(() => import('./add-form-filed/AdminAddFieldRelation'), {
  loading: () => <p>Loading...</p>,
})
const AdminAddFieldJson = dynamic(() => import('./add-form-filed/AdminAddFieldJson'), {
  loading: () => <p>Loading...</p>,
})

type ComponentType = {
  open: boolean,
  onClose: () => void
}

const ModalAddCollection: React.FC<ComponentType> = ({open, onClose}) => {
  const router = useRouter()
  
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
      router.refresh()
      
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
            <AdminFormFieldText id="name" name='name' required placeholder='eg. "posts' className='mt-6' />
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
                case 'DateTime':
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