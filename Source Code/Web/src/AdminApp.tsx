import Sidebar from './admin/components/sidebar/Sidebar';
import Content from './admin/components/Page';
import Header from './admin/components/Header';
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