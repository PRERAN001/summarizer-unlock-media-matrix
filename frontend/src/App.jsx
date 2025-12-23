import { useState } from 'react'


import './App.css'
import Pdf from './components/Pdf'
import {Routes, Route} from 'react-router-dom'
import Check from './components/Check'
function App() {


  return (
    <>
      <div>
        <Routes>
          <Route path ="/"   element={<Check/>}/>
          <Route path="/pdf" element={<Pdf />} />
        </Routes>
       
      </div>
    </>
  )
}

export default App
