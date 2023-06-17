import React from 'react'

type State = {
  value: string
}

type Action = {

}

const AdminViewFieldNumber: React.FC<State & Action> = ({
  value
}) => {
  return (
    <div>{value}</div>
  )
}

export default AdminViewFieldNumber