"use client"
import FormIOSSwitch from '@/components/FormIOSSwitch';
import IconCog from '@/components/icons/IconCog'
import { Button, Collapse } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useEffect, useRef, useState } from 'react'

type ComponentType = {
  onDelete: () => void
}

const AdminAddFieldSelect: React.FC<ComponentType> = ({
  onDelete
}) => {
  const [name, setName] = useState('field')

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
      <div className="flex w-full relative">
        <div className="flex-grow min-w-0 m-1.5 p-1 flex items-center space-x-2 focus-within:bg-gray-300 rounded">
          <span className="flex-none icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path></svg>
          </span>
          <input ref={inputRef} type="text" className="flex-grow min-w-0" value={name} onChange={(e) => setName(e.target.value)} />
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

export default AdminAddFieldSelect