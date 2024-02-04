import { Outlet } from 'react-router-dom'
import DeveloperSidebar from '../components/developers/developer-sidebar.tsx'

export default function DevelopersLayout() {
	return (
		<section>
			<div className='fixed inset-y-0 flex-col hidden md:flex'>
				<DeveloperSidebar />
			</div>
			<main className='h-full pt-16 md:pl-20'>
				<Outlet />
			</main>
		</section>
	)
}