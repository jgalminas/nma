import Sidebar from './admin/sidebar/Sidebar';
import Content from './admin/Page';
import Header from './admin/Header';
import { Outlet } from 'react-router';
import { PANEL_PARENT_ID } from './admin/constants';

export default function AdminApp() {

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