"use client"
import moment from 'moment'
import React from 'react'

type State = {
  value: string
}

type Action = {

}

const AdminViewFieldDateTime: React.FC<State & Action> = ({
  value
}) => {

  const date = moment(value)
  const formattedDate = date.format('YYYY-MM-DD')
  const formattedTime = date.format('HH:mm:ss');

  return (
    <div>
      <p>{formattedDate}</p>
      <p className='text-gray-500'>{formattedTime}</p>
    </div>
  )
}

export default AdminViewFieldDateTime