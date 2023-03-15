import Sidebar from './admin/Sidebar';
import Content from './admin/Content';
import Header from './admin/Header';
import { Outlet } from 'react-router';

export default function AdminApp() {

  return (
    <div className='h-screen w-full grid grid-cols-[min-content_auto] grid-rows-[60px_auto]'>
      <Sidebar/>
      <Header/>
      <Content>
        <Outlet/>
      </Content>
    </div>
  )
}