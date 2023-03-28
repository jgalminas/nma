import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDrawingCount, fetchRecentDrawings } from '../../../api/drawing';
import { fetchEventCount } from '../../../api/event';
import { fetchLocationCount } from '../../../api/location';
import Card from '../../Card';
import Content from '../../Content';
import DashboardStat from './DashboardStat';
import Heading from '../../primitives/Heading';
import LinkTextButton from '../../primitives/LinkTextButton';
import { getFriendlyDate } from '../../../utils/date';
import Table from '../../Table';
import LinkPrimaryButton from '../../primitives/LinkPrimaryButton';

export default function Dashboard() {
	
	const navigate = useNavigate();

	const columns: ReactNode[] = ["Drawer's Name", "Drawer's Age", "Event Name", "Date Added"];

	const NUM_OF_DRAWINGS = 10;

	const { data: event } = useQuery(['eventCount'], fetchEventCount);
	const { data: location } = useQuery(['locationCount'], fetchLocationCount);
	const { data: drawing } = useQuery(['drawingCount'], fetchDrawingCount);
	const { data: drawings } = useQuery(['recentDrawings', NUM_OF_DRAWINGS], () => fetchRecentDrawings(NUM_OF_DRAWINGS));

	const viewDrawing = (id: number) => navigate(`/admin/drawings/view/${id}`);

	return (
		<Content>

			<Heading> Dashboard </Heading>
			
			<div className='flex w-full gap-7 mt-7 flex-wrap'>

				<Card className='min-w-[18rem] w-80 flex-grow xl:flex-grow-0'>
					<DashboardStat label='Events' number={event?.count ?? 0}/>
					<Card.Divider/>
					<Card.Actions>
						<LinkTextButton to='/events'> View All </LinkTextButton>
						<LinkPrimaryButton to='/events/create'> Create Event </LinkPrimaryButton>
					</Card.Actions>
				</Card>

				<Card className='min-w-[18rem] w-80 flex-grow xl:flex-grow-0'>
					<DashboardStat label='Locations' number={location?.count ?? 0}/>
					<Card.Divider/>
					<Card.Actions>
						<LinkTextButton to='/locations'> View All </LinkTextButton>
						<LinkPrimaryButton to='/locations/create'> Add Location </LinkPrimaryButton>
					</Card.Actions>
				</Card>

				<Card className='min-w-[18rem] w-80 flex-grow xl:flex-grow-0'>
					<DashboardStat label='Drawings' number={drawing?.count ?? 0}/>
					<Card.Divider/>
					<Card.Actions>
						<LinkTextButton to='/drawings'> View All </LinkTextButton>
						<LinkPrimaryButton to='/drawings/score'> Score Drawings </LinkPrimaryButton>
					</Card.Actions>
				</Card>

			</div>

			<div className='mt-10 pb-10'>
				<h2 className='text-2xl text-gray-800 font-medium mb-5'> Recent Drawings </h2>

				<Table>
					<Table.Head>
						<Table.Row>
							{ columns.map((col, key) => {
								return (
									<Table.Heading key={key}>
										{ col }
									</Table.Heading>
								)
							}) }
						</Table.Row>
					</Table.Head>
					<Table.Body>
						{ drawings?.map((d) => {
								return (
									<Table.Row
										className='hover:bg-gray-100 cursor-pointer'
										key={d.id}
										onClick={() => d.id && viewDrawing(d.id)}>
										<Table.Data> { d.drawersName } </Table.Data>
										<Table.Data> { d.drawersAge } </Table.Data>
										<Table.Data>
											<Link className='underline' to={`/events/view/${d.event.id}`}> { d.event.name } </Link>
										</Table.Data>
										<Table.Data> { getFriendlyDate(d.createdAt) } </Table.Data>
									</Table.Row>
								)
							}) }
					</Table.Body>
				</Table>

			</div>

		</Content>
	)
}