"use client"
import FormIOSSwitch from '@/components/FormIOSSwitch';
import IconCog from '@/components/icons/IconCog'
import { Button, Collapse, Menu, MenuItem } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useEffect, useRef, useState } from 'react'
import SelectSingleMultiple from './SelectSingleMultiple';
import { DATA_FIELDS } from '@/lib/admin/fields';

type ComponentType = {
  onDelete: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  defaultValue?: string
}

const AdminAddFieldRelation: React.FC<ComponentType> = ({
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

  const icon = DATA_FIELDS.find(v => v.fieldName == 'Relation')?.icon

  return (
    <div className='rounded bg-gray-200 w-full group'>
      <div className="flex w-full relative items-center text-sm">
        <div className="flex-1 min-w-0 m-1.5 p-1.5 flex items-center space-x-2 focus-within:bg-gray-300 rounded">
          <span className="flex-none icon" dangerouslySetInnerHTML={{__html: icon || ''}}></span>
          <input ref={inputRef} type="text" className="flex-grow min-w-0" required defaultValue={defaultValue || 'field'} onChange={(e) => onChange(e)} />
        </div>

        <div className="flex-1 min-w-0 border-l">
          <SelectRelation />
        </div>

        <div className="flex-none border-l">
          <SelectSingleMultiple />
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

const SelectRelation = () => {

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

  const [value, setValue] = useState('')

  const [data, setData] = useState(['users', 'messages','posts'])

  const clickSelectItem = (value: string) => {
    setValue(value)
    setAnchorEl(null)
  }

  return (
    <div className="w-full h-full p-1.5">
      <button className={`w-full h-full p-1.5 flex items-center space-x-2 ${openFileds ? 'bg-gray-300' : ''} rounded text-left`}
        onClick={handleClick}
      >
        <div className='bg-transparent flex-grow min-w-0 h-full text-sm capitalize'>
          {value != '' ? value : 'Select collection *'}
        </div>
        <span className={`icon flex-none w-2 h-2 transition-all ${openFileds ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>
        </span>
      </button>
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
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {data.map((v,i) =>
          <MenuItem key={i} onClick={() => clickSelectItem(v)}>{v}</MenuItem>
        )}
      </Menu>
    </div>
  )
}

export default AdminAddFieldRelation