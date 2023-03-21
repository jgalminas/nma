import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EventPanel from './admin/components/views/events/ViewEventPanel';
import Dashboard from './admin/components/views/dashboard/Dashboard';
import Drawings from './admin/components/views/Drawings';
import Events from './admin/components/views/events/Events';
import Export from './admin/components/views/Export';
import Locations from './admin/components/views/Locations';
import AdminApp from './AdminApp';
import DrawingApp from './DrawingApp';
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import PANEL_MODE from './admin/enums/panel';
import ViewEventPanel from './admin/components/views/events/ViewEventPanel';
import CreateEventPanel from './admin/components/views/events/CreateEventPanel';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <DrawingApp/> }/>
          <Route path='admin' element={ <AdminApp/> }>
            <Route index element={ <Navigate to="dashboard" replace /> }/>
            <Route path='dashboard' element={ <Dashboard/> }/>
            <Route path='events' element={ <Events/> }>
              <Route path='view/:id' element={ <ViewEventPanel/> }/>
              {/* <Route path='edit/:id' element={ <ViewEventPanel/> }/> */}
              <Route path='create' element={ <CreateEventPanel/> }/>
              <Route path='view' element={ <Navigate to="/admin/events" replace /> }/>
              <Route path='edit' element={ <Navigate to="/admin/events" replace /> }/>
            </Route>
            <Route path='locations' element={ <Locations/> }/>
            <Route path='drawings' element={ <Drawings/> }/>
            <Route path='export' element={ <Export/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
