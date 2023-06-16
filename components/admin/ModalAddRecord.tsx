"use client"
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Drawer } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { revalidateTag } from 'next/cache'
import { DataRow, DataType } from 'prisma/prisma-client'
import { useRouter } from 'next/navigation'
import { FieldNameType } from '@/lib/admin/fields'
 
const AdminFormFieldText = dynamic(() => import('./form-field/AdminFormFieldText'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldRichText = dynamic(() => import('./form-field/AdminFormFieldRichText'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldNumber = dynamic(() => import('./form-field/AdminFormFieldNumber'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldBool = dynamic(() => import('./form-field/AdminFormFieldBool'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldDateTime = dynamic(() => import('./form-field/AdminFormFieldDateTime'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldSelect = dynamic(() => import('./form-field/AdminFormFieldSelect'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldFile = dynamic(() => import('./form-field/AdminFormFieldFile'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldRelation = dynamic(() => import('./form-field/AdminFormFieldRelation'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldJson = dynamic(() => import('./form-field/AdminFormFieldJson'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldEmail = dynamic(() => import('./form-field/AdminFormFieldEmail'), {
  loading: () => <p>Loading...</p>,
})
const AdminFormFieldUrl = dynamic(() => import('./form-field/AdminFormFieldUrl'), {
  loading: () => <p>Loading...</p>,
})

type ComponentType = {
  open: boolean,
  onClose: () => void,
  dataType: DataType & {
    dataRows: DataRow[]
  }
}

type DataFieldType = (Omit<DataRow, 'field'> & {
  value: any
  field: FieldNameType
})[]

const ModalAddRecord: React.FC<ComponentType> = ({open, onClose, dataType}) => {
  const router = useRouter()

  const onCloseModal = () => {
    if (JSON.stringify(oldData) != JSON.stringify(data)) {
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
  }

  const oldData: DataFieldType = dataType.dataRows.map(v => ({
    ...v,
    field: v.field as FieldNameType,
    value: null
  }))
  const [data, setData] = useState<DataFieldType>(oldData)

  const onChangeField = (value: any, id: string) => {
    setData(state => state.map(v => {
      if (v.id == id) {
        v.value = value
      }

      return v
    }))
  }

  // create record
  const [loading, setLoading] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (loading) return
      setLoading(true)

      const res = await fetch('/api/admin/database/table/edit-add', {
        method: 'POST',
        body: JSON.stringify({
          name: dataType.name,
          fields: data
        }),
        cache: 'no-store'
      })

      if (!res.ok) throw await res.text()

      const body = await res.json()

      router.refresh()
      console.log({body})
      onClose()
      
    } catch (error) {
      console.log({error})
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
        <form className='w-[850px] max-w-[100vw] flex flex-col h-full' onSubmit={submit}>
          <div className="flex-none bg-gray-100 py-6 px-8">
            <h3 className='text-xl'>New <span className="font-semibold">{dataType.name}</span> records</h3>
          </div>

          <div className="flex-grow min-h-0 overflow-y-auto py-6 px-8 flex flex-col space-y-4">
            {data.map(v => {
              switch(v.field) {
                case 'Plain text':
                  return <AdminFormFieldText key={v.id} id={v.id} name={v.name} onChange={(value) => onChangeField(value, v.id)} />
                case 'Rich text':
                  return <AdminFormFieldRichText key={v.id} id={v.id} name={v.name} onChange={(value) => onChangeField(value, v.id)} />
                case 'Number':
                  return <AdminFormFieldNumber key={v.id} id={v.id} name={v.name} />
                case 'Bool':
                  return <AdminFormFieldBool key={v.id} id={v.id} name={v.name} onChange={(value) => onChangeField(value, v.id)} />
                case 'Email':
                  return <AdminFormFieldEmail key={v.id} id={v.id} name={v.name} />
                case 'Url':
                  return <AdminFormFieldUrl key={v.id} id={v.id} name={v.name} />
                case 'DateTime':
                  return <AdminFormFieldDateTime key={v.id} id={v.id} name={v.name} />
                case 'Select':
                  return <AdminFormFieldSelect key={v.id} id={v.id} name={v.name} />
                case 'File':
                  return <AdminFormFieldFile key={v.id} id={v.id} name={v.name} />
                case 'Relation':
                  return <AdminFormFieldRelation key={v.id} id={v.id} name={v.name} />
                case 'JSON':
                  return <AdminFormFieldJson key={v.id} id={v.id} name={v.name} />
                default:
                  return null;
              }
            })}
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

export default ModalAddRecord