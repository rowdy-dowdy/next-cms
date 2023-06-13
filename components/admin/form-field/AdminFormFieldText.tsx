"use client"
import React from 'react'

type State = {
  label?: boolean,
  title: string,
  name: string
  required?: boolean,
  placeholder?: string,
  className?: string
}

const AdminFormFieldText: React.FC<State> = ({
  label,
  title,
  name,
  required = false,
  placeholder,
  className = ''
}) => {
  return (
    <div className={`rounded px-3 py-2 bg-gray-200 focus-within:bg-gray-300 ${className}`}>
      <p className="text-sm font-semibold mb-1 flex items-center space-x-2">
        <span className="icon w-4 h-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 8h2V6h3.252L7.68 18H5v2h8v-2h-2.252L13.32 6H17v2h2V4H5z"></path></svg>
        </span>
        {title} { required && <span className="text-red-500">*</span> }
      </p>
      <input type="text" name={name} 
        className="w-full border-none !bg-transparent" 
        required={required} placeholder={placeholder}
      />
    </div>
  )
}

export default AdminFormFieldText