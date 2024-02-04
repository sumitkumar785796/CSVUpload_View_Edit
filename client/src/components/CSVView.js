import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StoreCSV from './StoreCSV'

const CSVView = () => {
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
    const [alert, setAlert] = useState({
        message: '',
        type: ''
    })
    const deleteRecord = async (id) => {
        try {
            const isConfirmed = window.confirm('Are you sure you want to delete all records ?')
            if (!isConfirmed) {
                return
            }
            const res1 = await axios.get(`/drop/${id}`)
            setAlert({
                message: res1.data.message,
                type: 'success'
            })
            window.location.reload();
    
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <br />
        {
            alert.message && (
                <div style={{display:'none'}} className={`alert alert-${alert.type}`} role='alert'>
                    {alert.message}
                </div>
            )
        }
        <div className="row">
            {
                view.map((ele,index)=>(
                    <StoreCSV
                    key={index}
                    file={ele.Tables_in_csv}
                    deleteRecord={()=>deleteRecord(ele.Tables_in_csv)}
                    />
                ))
            }

        </div>
    </>
  )
}

export default CSVView