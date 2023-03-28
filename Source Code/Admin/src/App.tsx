import Sidebar from './components/sidebar/Sidebar';
import Content from './components/Page';
import Header from './components/Header';
import { Outlet } from 'react-router';
import { PANEL_PARENT_ID } from './constants';

export default function App() {

  return (
    <div id={PANEL_PARENT_ID} className='h-screen w-full grid grid-cols-[min-content_auto] grid-rows-[3.75rem_auto]'>
      <Sidebar/>
      <Header/>
      <Content>
        <Outlet/>
      </Content>
    </div>
  )
}