import { Chip } from '@mui/material'
import React, { useState } from 'react'

type State = {
  value: string
}

type Action = {

}

const AdminViewFieldId: React.FC<State & Action> = ({
  value
}) => {

  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 500);
  }

  return (
    <Chip icon={(
      <span className='icon w-4 h-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path></svg>
      </span>
    )} label={value} className={`hover:bg-gray-300 cursor-pointer transition-all ${copied ? '!bg-green-300' : ''}`} clickable={true} onClick={copy} />
  )
}

export default AdminViewFieldId