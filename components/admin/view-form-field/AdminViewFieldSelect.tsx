import React from 'react'

type State = {
  value: string
}

type Action = {

}

const AdminViewFieldSelect: React.FC<State & Action> = ({
  value
}) => {
  return (
    <div>{value}</div>
  )
}

export default AdminViewFieldSelect