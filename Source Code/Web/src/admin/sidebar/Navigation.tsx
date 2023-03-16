import { Route } from '../../types/admin.types'
import NavItem from './NavItem';
import { Squares2X2Icon, CalendarDaysIcon, MapPinIcon, PhoneIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function Navigation() {

	const routes: Route[] = [
		{ text: 'Dashboard', route: '/admin/dashboard', icon: <Squares2X2Icon className='w-6 h-6'/> },
		{ text: 'Events', route: '/admin/events', icon: <CalendarDaysIcon className='w-6 h-6'/> },
		{ text: 'Locations', route: '/admin/locations', icon: <MapPinIcon className='w-6 h-6'/> },
		{ text: 'Drawings', route: '/admin/drawings', icon: <PhoneIcon className='w-6 h-6'/> },
		{ text: 'Export Data', route: '/admin/export', icon: <ArrowDownTrayIcon className='w-6 h-6'/> },
	];

	return (
		<ol>
			{ routes.map(((route) => {
				return (
					<li key={route.text}>
						<NavItem route={route}/>
					</li>
				) 	
			})) }
		</ol>
	)
}