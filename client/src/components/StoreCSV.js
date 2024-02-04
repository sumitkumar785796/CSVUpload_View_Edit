import './CSStable.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StoreCSV = ({ file ,deleteRecord}) => {
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
  
    const modalId = `Modal-${id}`;
  
    return (
      <>
        <div className="col-sm-4">
          {/* Button trigger modal */}
          <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
            <NavLink to={`/${file}`}>
              <img src="../exc.png" alt={file} style={{ width: '200px' }} />
            </NavLink>
          </button>
          {/* Modal */}
          <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {file}
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          {viewSingle.length > 0 &&
                            Object.keys(viewSingle[0]).map((col) => (
                              <th scope="col" key={col}>
                                {col}
                              </th>
                            ))}

                        </tr>
                      </thead>
                      <tbody>
                        {viewSingle.length > 0 ? (
                          viewSingle.map((item, index) => (
                            <tr key={index}>
                            {Object.values(item).map((value, i) => (
                              <td key={i}>{value}</td>                              
                            ))}
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
                </div>
                <div className="modal-footer">
                    <button onClick={deleteRecord} className="btn btn-danger">Delete All Records</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default StoreCSV;
  
  
  