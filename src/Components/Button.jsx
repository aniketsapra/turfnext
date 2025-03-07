import React from 'react'

function Button({onClick, label}) {
  return (
    
      <button className="bg-transparent hover:bg-amber-400 text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent duration-300 cursor-pointer"  type="button" onClick={onClick}>
        {label}
      </button>
    
  )
}

export default Button
