import Card from '../Card';
import Content from '../Content';
import DashboardStat from '../DashboardStat';
import Heading from '../primitives/Heading';
import LinkButton from '../primitives/LinkButton';
import PrimaryButton from '../primitives/PrimaryButton';
import Table from './Table';

type Drawing = {
	id: number,
	event: {
		id: number,
		name: string
	},
	createdAt: string,
	drawersName: string,
	drawersAge: number
}

export default function Dashboard() {

	const drawings: Drawing[] = [
		{ id: 1, event: { id: 1, name: 'Event Name' }, createdAt: '25-2-2022', drawersName: 'Joe', drawersAge: 8 },
		{ id: 2, event: { id: 1, name: 'Event Name' }, createdAt: '25-2-2022', drawersName: 'Joe', drawersAge: 8 },
		{ id: 3, event: { id: 1, name: 'Event Name' }, createdAt: '25-2-2022', drawersName: 'Joe', drawersAge: 8 },
		{ id: 4, event: { id: 1, name: 'Event Name' }, createdAt: '25-2-2022', drawersName: 'Joe', drawersAge: 8 },
		{ id: 5, event: { id: 1, name: 'Event Name' }, createdAt: '25-2-2022', drawersName: 'Joe', drawersAge: 8 },
	];

	return (
		<Content>

			<Heading> Dashboard </Heading>
			
			<div className='flex w-full gap-7 mt-7 flex-wrap'>

				<Card className='w-80'>
					<DashboardStat label='Events' number={73}/>
					<Card.Divider/>
					<Card.Actions>
						<LinkButton to='/admin/events'> View All </LinkButton>
						<PrimaryButton> Create Event </PrimaryButton>
					</Card.Actions>
				</Card>

				<Card className='w-80'>
					<DashboardStat label='Locations' number={7}/>
					<Card.Divider/>
					<Card.Actions>
						<LinkButton to='/admin/locations'> View All </LinkButton>
						<PrimaryButton> Add Location </PrimaryButton>
					</Card.Actions>
				</Card>

				<Card className='w-80'>
					<DashboardStat label='Drawings' number={504}/>
					<Card.Divider/>
					<Card.Actions>
						<LinkButton to='/admin/drawings'> View All </LinkButton>
						<PrimaryButton> Score Drawings </PrimaryButton>
					</Card.Actions>
				</Card>

			</div>

			<div className='mt-10'>
				<h2 className='text-2xl text-gray-800 font-medium mb-5'> Recent Drawings </h2>

				<Table>
					<Table.Head>
						<Table.Row>
							<Table.Heading>
								Drawer's Name
							</Table.Heading>
							<Table.Heading>
								Drawer's Age
							</Table.Heading>
							<Table.Heading>
								Event Name
							</Table.Heading>
							<Table.Heading>
								Date Added
							</Table.Heading>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						{ drawings.map((d) => {
								return (
									<Table.Row key={d.id}>
										<Table.Data> { d.drawersName } </Table.Data>
										<Table.Data> { d.drawersAge } </Table.Data>
										<Table.Data> { d.event.name } </Table.Data>
										<Table.Data> { d.createdAt } </Table.Data>
									</Table.Row>
								)
							}) }
					</Table.Body>
				</Table>

			</div>

		</Content>
	)
}