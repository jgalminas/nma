export interface DashboardStatProps {
	label: string,
	number: number 
}

export default function DashboardStat({ label, number }: DashboardStatProps) {
	return (
		<div>
			<h3 className='text-4xl font-medium text-gray-700'> { number } </h3>
			<h4 className='font-medium text-gray-600'> { label } </h4>
		</div>
	)
}