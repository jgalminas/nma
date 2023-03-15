import Sidebar from './admin/Sidebar';
import Content from './admin/Content';
import Header from './admin/Header';

export default function AdminApp() {

  return (
    <div className='h-screen w-full grid grid-cols-[min-content_auto] grid-rows-[min-content_auto]'>
      <Sidebar/>
      <Header/>
      <Content/>
    </div>
  )
}