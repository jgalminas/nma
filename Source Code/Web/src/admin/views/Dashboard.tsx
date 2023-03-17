import Card from '../Card';
import Content from '../Content';
import DashboardStat from '../DashboardStat';
import Heading from '../primitives/Heading';
import PrimaryButton from '../primitives/PrimaryButton';
import TextButton from '../primitives/TextButton';

export default function Dashboard() {
	return (
		<Content>

			<Heading> Dashboard </Heading>
			
			<div className='flex w-full gap-7 mt-7 flex-wrap'>

				<Card className='w-80'>
					<DashboardStat label='Events' number={73}/>
					<Card.Divider/>
					<Card.Actions>
						<TextButton> View All </TextButton>
						<PrimaryButton> Create Event </PrimaryButton>
					</Card.Actions>
				</Card>

				<Card className='w-80'>
					<DashboardStat label='Locations' number={7}/>
					<Card.Divider/>
					<Card.Actions>
						<TextButton> View All </TextButton>
						<PrimaryButton> Add Location </PrimaryButton>
					</Card.Actions>
				</Card>

				<Card className='w-80'>
					<DashboardStat label='Drawings' number={504}/>
					<Card.Divider/>
					<Card.Actions>
						<TextButton> View All </TextButton>
						<PrimaryButton> Score Drawings </PrimaryButton>
					</Card.Actions>
				</Card>

			</div>

			<div className='mt-10'>
				<h2 className='text-2xl text-gray-800 font-medium'> Recent Drawings </h2>
			</div>

		</Content>
	)
}