import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/components/views/dashboard/Dashboard';
import Drawings from './admin/components/views/Drawings';
import Events from './admin/components/views/events/Events';
import Export from './admin/components/views/Export';
import Locations from './admin/components/views/Locations';
import AdminApp from './AdminApp';
import DrawingApp from './DrawingApp';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ViewEventPanel from './admin/components/views/events/ViewEventPanel';
import CreateEditEventPanel from './admin/components/views/events/CreateEditEventPanel';
import Panel from './admin/components/Panel';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
            <Route path=':id' element={ <Panel onClose='/admin/events'> <Outlet/> </Panel> }>
              <Route index element={ <ViewEventPanel/> }/>
              <Route path='edit' element={ <CreateEditEventPanel/> }/>
            </Route>
              <Route path='create' element={ <Panel onClose='/admin/events'> <CreateEditEventPanel/> </Panel>  }/>
            </Route>
            <Route path='locations' element={ <Locations/> }/>
            <Route path='drawings' element={ <Drawings/> }/>
            <Route path='export' element={ <Export/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </React.StrictMode>
)
