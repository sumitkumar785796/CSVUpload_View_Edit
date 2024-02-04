import React, { useState } from 'react'
import axios from "axios";
import Navbar from './Navbar'
import CSVView from './CSVView'

const CSVForm = () => {
    const [upload,setUpload]=useState({
        file:null
    })
    const [alert,setAlert] = useState({
        message:'',
        type:''
    })
    const setRecord = (e) =>{
        const file= e.target.files[0];
        setUpload((preVal)=>({
            ...preVal,
            file:file
        }))
    } 
    const HandleSubmit = async (e) =>{
        e.preventDefault()
        const {file} = upload
        try {
            const formData = new FormData()
            formData.append("file",file)
            const res = await axios.post('/createAndView',formData)
            setAlert({
                message:res.data.message,
                type:'success'
            })
            setTimeout(() => {
                setAlert([])
                window.location.reload();
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <>
        <Navbar/>
        <div className="container">
            {
                alert.message && (
                    <div className={`alert alert-${alert.type}`} role='alert'>
                        {alert.message}
                    </div>
                )
            }
            <label htmlFor="file" className="form-label">Upload CSV File</label>
            <input className="form-control form-control-lg" id="file" type="file" name='file' onChange={setRecord} />
            <br />
            <button className='btn btn-success' onClick={HandleSubmit}>Upload</button>
            <br />
            <CSVView/>
        </div>
    </>
  )
}

export default CSVForm