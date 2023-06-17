import React from 'react'

type State = {
  value: string
}

type Action = {

}

const AdminViewFieldRelation: React.FC<State & Action> = ({
  value
}) => {
  return (
    <div>{value}</div>
  )
}

export default AdminViewFieldRelation