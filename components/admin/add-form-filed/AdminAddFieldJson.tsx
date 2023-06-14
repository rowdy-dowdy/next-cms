"use client"
import FormIOSSwitch from '@/components/FormIOSSwitch';
import IconCog from '@/components/icons/IconCog'
import { Button, Collapse } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useEffect, useRef, useState } from 'react'

type ComponentType = {
  onDelete: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  defaultValue?: string
}

const AdminAddFieldJson: React.FC<ComponentType> = ({
  onDelete,
  onChange,
  defaultValue
}) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleChange = () => {
    setExpanded(state => !state);
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const deleteField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete()
  }

  useEffect(() => {
    inputRef.current?.select()
  },[])

  return (
    <div className='rounded bg-gray-200 w-full group'>
      <div className="flex w-full relative text-sm">
        <div className="flex-grow min-w-0 m-1.5 p-1 flex items-center space-x-2 focus-within:bg-gray-300 rounded">
          <span className="flex-none icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 22h1v-2h-.989C8.703 19.994 6 19.827 6 16c0-1.993-.665-3.246-1.502-4C5.335 11.246 6 9.993 6 8c0-3.827 2.703-3.994 3-4h1V2H8.998C7.269 2.004 4 3.264 4 8c0 2.8-1.678 2.99-2.014 3L2 13c.082 0 2 .034 2 3 0 4.736 3.269 5.996 5 6zm13-11c-.082 0-2-.034-2-3 0-4.736-3.269-5.996-5-6h-1v2h.989c.308.006 3.011.173 3.011 4 0 1.993.665 3.246 1.502 4-.837.754-1.502 2.007-1.502 4 0 3.827-2.703 3.994-3 4h-1v2h1.002C16.731 21.996 20 20.736 20 16c0-2.8 1.678-2.99 2.014-3L22 11z"></path></svg>
          </span>
          <input ref={inputRef} type="text" className="flex-grow min-w-0" required defaultValue={defaultValue || 'field'} onChange={(e) => onChange(e)} />
        </div>
        <div className="flex-none p-2 border-l">
          <span className="icon w-8 h-8 p-1 cursor-pointer hover:bg-gray-300 rounded-full"
            onClick={handleChange}
          ><IconCog /></span>
        </div>
        <div className="absolute top-1/2 right-full -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m7 17 5 5 5-5h-4V7h4l-5-5-5 5h4v10z"></path></svg>
          </span>
        </div>
      </div>
      <Collapse in={expanded}>
        <div className='rounded-b border-2 border-gray-300 p-2 bg-white'>
          <div className="flex justify-between" style={{userSelect: 'none'}}>
            <FormIOSSwitch label="None Empty" size='small' />
            <Button variant="text" color='error' onClick={(e) => deleteField(e)}>Remove</Button>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default AdminAddFieldJson