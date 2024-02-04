import React from 'react'
import { NavLink } from 'react-router-dom'

const StoreTable = ({file}) => {
  return (
    <>
    <div className="col-sm-4">
    <NavLink to={`/view/${file}`}>
        <img src="../exc.png" alt="file" style={{ width: '200px' }} />
    </NavLink>
    </div>
    </>
  )
}

export default StoreTable