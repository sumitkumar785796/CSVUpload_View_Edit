import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CSVForm from './components/CSVForm';
import EditForm from './components/EditForm';
import ViewTable from './components/ViewTable';
import ViewTableSingle from './components/ViewTableSingle';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CSVForm/>}/>
        <Route path=':id' element={<CSVForm/>}/>
        <Route path='/view' element={<ViewTable/>}/>
        <Route path='/view/:id' element={<ViewTableSingle/>}/>
        <Route path='/edit/:tableid/:rowId' element={<EditForm/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App