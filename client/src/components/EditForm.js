import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const EditForm = () => {
  const { tableid, rowId } = useParams();
  const [viewSingle, setViewSingle] = useState({});
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  const getData1 = useCallback(async () => {
    try {
      const res = await axios.get(`/showsingle/${tableid}/${rowId}`);
      const data = res.data.message[0];
      setViewSingle(data);
    } catch (error) {
      console.error(error);
    }
  }, [tableid, rowId]);

  useEffect(() => {
    getData1();
  }, [getData1, tableid, rowId]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/editrecord/${tableid}/${rowId}`,{ newData: viewSingle });
      setAlert({
        message: response.data.message,
        type: 'success',
      });

      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setViewSingle((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {/* Display alert message */}
        {alert.message && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <h1 className="text-center">Edit {tableid}</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form>
              {Object.keys(viewSingle).map((col, index) => (
                <div key={index} className="mb-3">
                  <label htmlFor={index} className="form-label">
                    {col}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={index}
                    name={col}
                    value={viewSingle[col] || ''}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary" onClick={updateData}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;
