"use client"
import FormIOSSwitch from '@/components/FormIOSSwitch'
import { DATA_FIELDS } from '@/lib/admin/fields'
import React, { useRef, useState } from 'react'

type State = {
  id: string,
  name: string
  required?: boolean,
  className?: string,
  placeholder?: string,
  defaultValue?: any,
  value?: any,
  onChange?: (data: any) => void,
}

const AdminFormFieldBool: React.FC<State> = ({
  id,
  name,
  required = false,
  className = '',
  placeholder,
  defaultValue,
  value,
  onChange
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked)
    }
  }

  return (
    <div>
      {/* <FormIOSSwitch name={name} label={name} /> */}
      <FormIOSSwitch checked={value} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} label={name} />
    </div>
  )
}

export default AdminFormFieldBool