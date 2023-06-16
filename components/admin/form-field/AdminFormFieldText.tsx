"use client"
import { DATA_FIELDS } from '@/lib/admin/fields'
import React, { useRef } from 'react'

type State = {
  id: string,
  name: string
  required?: boolean,
  className?: string,
  placeholder?: string,
  value?: any,
  onChange?: (data: any) => void,
}

const AdminFormFieldText: React.FC<State> = ({
  id,
  name,
  required = false,
  className = '',
  placeholder,
  value,
  onChange
}) => {
  const icon = DATA_FIELDS.find(v => v.fieldName == 'Plain text')?.icon

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <label htmlFor={id} className={`block rounded px-3 py-2 bg-gray-200 focus-within:bg-gray-300 select-none ${className}`}>
      <p className="text-sm font-semibold mb-1 flex items-center space-x-2">
        <span className="icon w-4 h-4" dangerouslySetInnerHTML={{__html: icon || ''}}></span>
        {name}
      </p>
      <input type="text" name={name} id={id}
        className="w-full border-none !bg-transparent" 
        required={required} placeholder={placeholder} onChange={onChangeValue}
      />
    </label>
  )
}

export default AdminFormFieldText