"use client"
import FormIOSSwitch from '@/components/FormIOSSwitch'
import { DATA_FIELDS } from '@/lib/admin/fields'
import React, { useRef, useState } from 'react'

type State = {
  id: string,
  name: string
  required?: boolean,
  className?: string,
  placeholder?: string
}

const AdminFormFieldBool: React.FC<State> = ({
  id,
  name,
  required = false,
  className = '',
  placeholder
}) => {
  // const icon = DATA_FIELDS.find(v => v.fieldName == 'Plain text')?.icon

  // const [checked, setChecked] = React.useState(true)

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked)
  // }

  return (
    <div>
      <FormIOSSwitch name={name} label={name} />
      {/* <FormIOSSwitch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} label={name} /> */}
    </div>
  )
}

export default AdminFormFieldBool