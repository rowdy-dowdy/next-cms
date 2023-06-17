"use client"
import React, { useEffect, useState } from 'react'

type State = {
  value: string
}

type Action = {

}

const AdminViewFieldRichText: React.FC<State & Action> = ({
  value
}) => {
  let tempElement: HTMLDivElement | null = null
  if (typeof window !== 'undefined') {
    tempElement = document.createElement('div')
  }

  const [outerHtmlString, setOuterHtmlString] = useState(``)

  useEffect(() => {
    if (tempElement) {
      tempElement.innerHTML = value
      setOuterHtmlString(tempElement.innerText)
    }
  },[value])

  return (
    <div className='line-clamp-3'>{outerHtmlString}</div>
  )
}

export default AdminViewFieldRichText