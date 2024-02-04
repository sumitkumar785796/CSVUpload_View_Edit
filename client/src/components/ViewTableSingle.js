
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
const ViewTableSingle = () => {
    const [viewSingle, setViewSingle] = useState([]);
    const { id } = useParams('');
    
    const getData = useCallback(async () => {
      try {
        if(id){
            const res = await axios.get(`/show1/${id}`);
            const data = res.data.message;
            setViewSingle(data);
        }else{
            console.log(' ')
        }
      } catch (error) {
        console.log(error);
      }
    }, [id]);
  
    useEffect(() => {
      getData();
    }, [getData, id]);
  return (
      <>
    <Navbar/>
    <div className="container">
        <h1 className="text-center">View All Records</h1>
                    <table className="table">
                      <thead>
                        <tr>
                          {viewSingle.length > 0 &&
                            Object.keys(viewSingle[0]).map((col) => (
                              <th scope="col" key={col}>
                                {col}
                              </th>
                            ))}
                            <th>
                                Edit
                            </th>
                        </tr>
                      </thead>
                      <tbody>
                      {viewSingle.length > 0 ? (
                        viewSingle.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i}>{value}</td>                              
                                ))}
                                <td>
                                    <NavLink to={`/edit/${id}/${item.id}`} className='btn btn-success'>Edit</NavLink>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={viewSingle.length + 1}>Not available</td>
                        </tr>
                    )}
                      </tbody>
                    </table>
    </div>
    </>
  )
}

export default ViewTableSingle