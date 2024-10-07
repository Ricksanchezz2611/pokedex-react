import React from 'react'

const Button = ({Label,onclick}) => {
  return (
    <button onclick={onclick} className="btn">{Label}</button>
  )
}

export default Button