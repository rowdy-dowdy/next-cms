"use client"
import FormIOSSwitch from '@/components/FormIOSSwitch';
import IconCog from '@/components/icons/IconCog'
import { Button, Collapse } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useState } from 'react'

type ComponentType = {

}

const AdminAddFieldText: React.FC<ComponentType> = ({

}) => {
  const [name, setName] = useState('field')

  const [expanded, setExpanded] = useState<boolean>(false)

  const handleChange = () => {
    setExpanded(state => !state);
  };

  return (
    <div className='rounded bg-gray-200 w-full group'>
      <div className="flex w-full relative">
        <div className="flex-grow min-w-0 m-1.5 p-1 flex items-center space-x-2 focus-within:bg-gray-300 rounded">
          <span className="flex-none icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 8h2V6h3.252L7.68 18H5v2h8v-2h-2.252L13.32 6H17v2h2V4H5z"></path></svg>
          </span>
          <input type="text" className="flex-grow min-w-0" value={name} onChange={(e) => setName(e.target.value)} />
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
            <Button variant="text" color='error'>Remove</Button>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default AdminAddFieldText