import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './features/dashboard/Dashboard';
import Drawings from './features/drawings/Drawings';
import Events from './features/events/Events';
import Export from './features/export/Export';
import Locations from './features/locations/Locations';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ViewEventPanel from './features/events/ViewEventPanel';
import CreateEditEventPanel from './features/events/CreateEditEventPanel';
import Panel from './components/Panel';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ViewLocationPanel from './features/locations/ViewLocationPanel';
import CreateEditLocationPanel from './features/locations/CreateEditLocationPanel';
import { PageProvider } from './contexts/PageContext';
import { AuthRoute, UnauthedOnlyRoute, UserProvider } from './contexts/UserContext';
import UserSelect from './features/user/UserSelect';
import ViewDrawingPanel from './features/drawings/ViewDrawingPanel';
import EditDrawingPanel from './features/drawings/EditDrawingPanel';
import Scoring from './features/scoring/Scoring';
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <HashRouter>
          <Routes>
            <Route path='/' element={ <AuthRoute> <App/> </AuthRoute> }>
              <Route index element={  <Navigate to="dashboard" replace />  }/>
              <Route path='dashboard' element={ <Dashboard/> }/>

              <Route path='events' element={ <PageProvider> <Events/> </PageProvider> }>
                <Route path=':id' element={ <Panel onClose='/events'> <Outlet/> </Panel> }>
                  <Route index element={ <ViewEventPanel/> }/>
                  <Route path='edit' element={ <CreateEditEventPanel/> }/>
                </Route>
                <Route path='create' element={ <Panel onClose='/events'> <CreateEditEventPanel/> </Panel>  }/>
              </Route>

              <Route path='locations' element={ <PageProvider> <Locations/> </PageProvider>  }>
                <Route path=':id' element={ <Panel onClose='/locations'> <Outlet/> </Panel> }>
                  <Route index element={ <ViewLocationPanel/> }/>
                  <Route path='edit' element={ <CreateEditLocationPanel/> }/>
                </Route>
                <Route path='create' element={ <Panel onClose='/locations'> <CreateEditLocationPanel/> </Panel>  }/>
              </Route>

              <Route path='drawings' element={ <PageProvider> <Drawings/> </PageProvider> }>
              <Route path=':id' element={ <Panel onClose='/drawings'> <Outlet/> </Panel> }>
                <Route index element={ <ViewDrawingPanel/> }/>
                <Route path='edit' element={ <EditDrawingPanel/> }/>
              </Route>
              </Route>

              <Route path='export' element={ <Export/> }/>
            </Route>

            <Route path='drawings' element={ <PageProvider> <Drawings/> </PageProvider> }>
              <Route path=':id' element={ <Panel onClose='/drawings'> <Outlet/> </Panel> }>
                <Route index element={ <ViewDrawingPanel/> }/>
                <Route path='edit' element={ <EditDrawingPanel/> }/>
              </Route>
            </Route>

            <Route path='drawings/score'>
              <Route index element={ <Scoring/> }/>
              <Route path=':id' element={ <Scoring/> }/>
            </Route>

            <Route path='login' element={ <UnauthedOnlyRoute> <UserSelect/>  </UnauthedOnlyRoute> }/>

          </Routes>
        </HashRouter>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
