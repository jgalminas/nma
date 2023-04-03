import { Route } from '../../admin.types'
import NavItem from './NavItem';
import { Squares2X2Icon, CalendarDaysIcon, MapPinIcon, ArrowDownTrayIcon, PhotoIcon} from '@heroicons/react/24/outline';

export default function Navigation() {

	const routes: Route[] = [
		{ text: 'Dashboard', route: 'dashboard', icon: <Squares2X2Icon className='w-6 h-6'/> },
		{ text: 'Events', route: 'events', icon: <CalendarDaysIcon className='w-6 h-6'/> },
		{ text: 'Locations', route: 'locations', icon: <MapPinIcon className='w-6 h-6'/> },
		{ text: 'Drawings', route: 'drawings', icon: <PhotoIcon className='w-6 h-6'/> },
		{ text: 'Export Data', route: 'export', icon: <ArrowDownTrayIcon className='w-6 h-6'/> },
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