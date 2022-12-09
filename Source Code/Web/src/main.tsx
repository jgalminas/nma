import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminApp from './AdminApp';
import DrawingApp from './DrawingApp';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DrawingApp/>}/>
        <Route path='/admin' element={<AdminApp/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
