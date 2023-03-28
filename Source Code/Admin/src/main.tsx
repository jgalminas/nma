import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './components/views/dashboard/Dashboard';
import Drawings from './components/views/drawings/Drawings';
import Events from './components/views/events/Events';
import Export from './components/views/Export';
import Locations from './components/views/locations/Locations';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ViewEventPanel from './components/views/events/ViewEventPanel';
import CreateEditEventPanel from './components/views/events/CreateEditEventPanel';
import Panel from './components/Panel';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path='/' element={ <App/> }>
            <Route index element={ <Navigate to="dashboard" replace /> }/>
            <Route path='dashboard' element={ <Dashboard/> }/>
            <Route path='events' element={ <Events/> }>
            <Route path=':id' element={ <Panel onClose='/events'> <Outlet/> </Panel> }>
              <Route index element={ <ViewEventPanel/> }/>
              <Route path='edit' element={ <CreateEditEventPanel/> }/>
            </Route>
              <Route path='create' element={ <Panel onClose='/events'> <CreateEditEventPanel/> </Panel>  }/>
            </Route>
            <Route path='locations' element={ <Locations/> }/>
            <Route path='drawings' element={ <Drawings/> }/>
            <Route path='export' element={ <Export/> }/>
          </Route>
        </Routes>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
