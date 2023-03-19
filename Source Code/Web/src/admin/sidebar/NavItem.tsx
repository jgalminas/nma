import { useLocation } from 'react-router';
import { Link } from 'react-router-dom'
import { Route } from '../../types/admin.types';

export interface NavItemProps {
	route: Route
}

export default function NavItem({ route }: NavItemProps) {

	const location = useLocation();
	const isActive = location.pathname.includes(route.route);

	return (
		<Link to={route.route}>
			<div className={`${isActive && 'bg-gray-700'} p-2 rounded-md text-gray-200 text-sm font-medium flex items-center gap-3`}>
				{ route.icon }
				{ route.text }
			</div>
		</Link>
	)
}