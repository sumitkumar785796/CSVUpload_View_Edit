import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import StoreTable from './StoreTable'

const ViewTable = () => {
  const [ view , setView ] = useState([])
  useEffect(()=>{
      const fetchData = async () =>{
          try {
              const res = await axios.get('/show')
              setView(res.data.message)
          } catch (error) {
              console.log(error)
          }
      }
      fetchData()
  },[]) 
  return (
    <>
        <Navbar/>
        <div className="container">
        <h1 className='text-center'>View All CSV File</h1>
        <div className="row">
        {
          view.map((ele,index)=>(
            <StoreTable
              key={index}
              file={ele.Tables_in_csv}
            />
          ))
        }
        </div>
      </div>
    </>
  )
}

export default ViewTable