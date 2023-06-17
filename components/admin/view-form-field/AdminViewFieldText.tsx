import React from 'react'

type State = {
  value: string
}

type Action = {

}

const AdminViewFieldText: React.FC<State & Action> = ({
  value
}) => {
  return (
    <>{value}</>
  )
}

export default AdminViewFieldText