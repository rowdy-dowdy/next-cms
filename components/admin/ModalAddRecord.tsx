"use client"
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Drawer } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { revalidateTag } from 'next/cache'
import { DataRow, DataType } from 'prisma/prisma-client'
import { useRouter } from 'next/navigation'
import { FieldNameType } from '@/lib/admin/fields'
 
import AdminFormFieldText from './form-field/AdminFormFieldText'
import AdminFormFieldRichText from './form-field/AdminFormFieldRichText'
import AdminFormFieldNumber from './form-field/AdminFormFieldNumber'
import AdminFormFieldBool from './form-field/AdminFormFieldBool'
import AdminFormFieldDateTime from './form-field/AdminFormFieldDateTime'
import AdminFormFieldSelect from './form-field/AdminFormFieldSelect'
import AdminFormFieldFile from './form-field/AdminFormFieldFile'
import AdminFormFieldRelation from './form-field/AdminFormFieldRelation'
import AdminFormFieldJson from './form-field/AdminFormFieldJson'
import AdminFormFieldEmail from './form-field/AdminFormFieldEmail'
import AdminFormFieldUrl from './form-field/AdminFormFieldUrl'

type ComponentType = {
  open: boolean,
  onClose: () => void,
  dataType: DataType & {
    dataRows: DataRow[]
  },
  editValue?: any
}

type DataFieldType = (Omit<DataRow, 'field'> & {
  value: any
  field: FieldNameType
})[]

const ModalAddRecord: React.FC<ComponentType> = ({open, onClose, dataType, editValue}) => {
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

  // data

  const setDefaultData = () => dataType.dataRows.map(v => {
    let tempValue: any = ''
    if ((v.field as FieldNameType) == "Bool") {
      tempValue = true
    }

    return {
      ...v,
      field: v.field as FieldNameType,
      value: tempValue
    }
  })

  const [oldData, setOldData] = useState(setDefaultData())
  const [data, setData] = useState<DataFieldType>(setDefaultData())

  const onChangeField = (value: any, id: string) => {
    setData(state => state.map(v => {
      if (v.id == id) {
        v.value = value
      }

      return v
    }))
  }

  useEffect(() => {
    let tempData = setDefaultData()
    if (editValue) {
      tempData = oldData.map(v => {
        let tempValue = editValue[v.name]

        if (v.field == "Bool") {
          tempValue = true
        }

        return {
          ...v,
          value: tempValue
        }
      })
    }

    setOldData(tempData)
    setData(tempData)
  }, [editValue])

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
          editId: editValue?.id,
          fields: data
        }),
        cache: 'no-store'
      })

      if (!res.ok) throw await res.text()

      const body = await res.json()

      router.refresh()
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
                  return <AdminFormFieldText key={v.id} id={v.id} name={v.name} 
                    value={v.value} onChange={(value) => onChangeField(value, v.id)} />
                case 'Rich text':
                  return <AdminFormFieldRichText key={v.id} id={v.id} name={v.name} 
                    defaultValue={v.value} onChange={(value) => onChangeField(value, v.id)} />
                case 'Number':
                  return <AdminFormFieldNumber key={v.id} id={v.id} name={v.name} />
                case 'Bool':
                  return <AdminFormFieldBool key={v.id} id={v.id} name={v.name} 
                    defaultValue={v.value} onChange={(value) => onChangeField(value, v.id)} />
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