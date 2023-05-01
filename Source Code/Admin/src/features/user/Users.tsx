import { Outlet } from 'react-router-dom';
import { PANEL_PARENT_ID } from '../../constants';

export default function Users() {
	return (
		<div id={PANEL_PARENT_ID} className='h-screen w-full flex justify-center items-center bg-gray-100'>
			<Outlet/>
		</div>
	)
}