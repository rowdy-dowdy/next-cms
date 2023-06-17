import React from 'react'

type State = {
  value: string
}

type Action = {

}

const AdminViewFieldBool: React.FC<State & Action> = ({
  value
}) => {
  return (
    <>{value == '1' ? 'true' : 'false'}</>
  )
}

export default AdminViewFieldBool