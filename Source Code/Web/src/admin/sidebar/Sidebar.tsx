import Navigation from './Navigation';
import Logo from './Logo';

export default function Sidebar() {
	return (
		<div className='h-full w-60 row-span-2 bg-slate-900 p-5'>		
			<Logo/>
			<Navigation/>
		</div>
	)
}