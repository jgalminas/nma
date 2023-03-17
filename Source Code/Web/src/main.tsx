import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EventPanel from './admin/EventPanel';
import Dashboard from './admin/views/Dashboard';
import Drawings from './admin/views/Drawings';
import Events from './admin/views/Events';
import Export from './admin/views/Export';
import Locations from './admin/views/Locations';
import AdminApp from './AdminApp';
import DrawingApp from './DrawingApp';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <DrawingApp/> }/>
        <Route path='admin' element={ <AdminApp/> }>
          <Route index element={ <Navigate to="dashboard" replace /> }/>
          <Route path='dashboard' element={ <Dashboard/> }/>
          <Route path='events' element={ <Events/> }>
            <Route path='view/:id' element={ <EventPanel/> }/>
            <Route path='edit/:id'/>
          </Route>
          <Route path='locations' element={ <Locations/> }/>
          <Route path='drawings' element={ <Drawings/> }/>
          <Route path='export' element={ <Export/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
