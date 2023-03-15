import { NavLink } from 'react-router-dom'
import { Route } from '../types/admin.types'

export default function Navigation() {

	const routes: Route[] = [
		{ text: 'Dashboard', route: '/admin/dashboard' },
		{ text: 'Events', route: '/admin/events'},
		{ text: 'Locations', route: '/admin/locations'},
		{ text: 'Drawings', route: '/admin/drawings'},
		{ text: 'Export Data', route: '/admin/export'},
	];

	return (
		<ol>
			{ routes.map((r => {
				return (
					<li>
						<NavLink
							to={ r.route }
							className={({ isActive }) => isActive ? "bg-green-300" : "" + ""}>
							{ r.text }
						</NavLink>
					</li>
				) 	
			})) }
		</ol>
	)
}