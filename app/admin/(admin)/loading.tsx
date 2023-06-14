import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-full grid place-items-center'>
      <style>
      {`.icon-custom-loading {
        stroke: currentColor;
        stroke-dasharray: 80px,200px;
        stroke-dashoffset: 0;
        -webkit-animation: animation-1p2h4ri 1.4s ease-in-out infinite;
        animation: animation-icon-loading 1.4s ease-in-out infinite;
      }
      @keyframes animation-icon-loading {
        0% {
          stroke-dasharray: 1px,200px;
          stroke-dashoffset: 0;
        }

        50% {
          stroke-dasharray: 100px,200px;
          stroke-dashoffset: -15px;
        }
        100% {
          stroke-dasharray: 100px,200px;
          stroke-dashoffset: -125px;
        }
      }`}
      </style>
      <span className="icon w-10 h-10">
        <svg viewBox="22 22 44 44"><circle className="icon-custom-loading" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"></circle></svg>
      </span>
    </div>
  )
}

export default loading