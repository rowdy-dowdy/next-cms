import { Menu, MenuItem } from "@mui/material"
import { useState } from "react"

const SelectSingleMultiple = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openFileds = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [value, setValue] = useState('single')

  const clickSelectItem = (value: string) => {
    setValue(value)
    setAnchorEl(null)
  }

  return (
    <div className="w-24 h-full p-1.5">
      <button className={`w-full h-full p-1.5 flex items-center space-x-2 ${openFileds ? 'bg-gray-300' : ''} rounded`}
        onClick={handleClick}
      >
        <div className='bg-transparent flex-grow min-w-0 h-full text-sm capitalize'>{value}</div>
        <span className={`icon flex-none w-2 h-2 transition-all ${openFileds ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>
        </span>
      </button>
      <Menu
        // MenuListProps={{
        //   // "aria-labelledby": "basic-button",
        //   sx: { width: widthFileds }
        // }}
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
        <MenuItem onClick={() => clickSelectItem('single')}>Single</MenuItem>
        <MenuItem onClick={() => clickSelectItem('multiple')}>Multiple</MenuItem>
      </Menu>
    </div>
  )
}

export default SelectSingleMultiple