import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDrawingCount, fetchDrawings } from '../drawings/drawing.api';
import { fetchEventCount } from '../events/event.api';
import { fetchLocationCount } from '../locations/location.api';
import Card from '../../components/Card';
import Content from '../../components/Content';
import DashboardStat from './DashboardStat';
import PageHeading from '../../components/PageHeading';
import LinkTextButton from '../../components/LinkTextButton';
import { getFriendlyDate } from '../../utils/date';
import Table from '../../components/Table';
import LinkPrimaryButton from '../../components/LinkPrimaryButton';

export default function Dashboard() {
	
	const navigate = useNavigate();

	const columns: ReactNode[] = ["Drawer's Name", "Drawer's Age", "Event Name", "Date Added"];

	const NUM_OF_DRAWINGS = 10;

	const { data: event } = useQuery(['eventCount'], fetchEventCount);
	const { data: location } = useQuery(['locationCount'], fetchLocationCount);
	const { data: drawing } = useQuery(['drawingCount'], fetchDrawingCount);
	const { data: drawings } = useQuery(['recentDrawings', NUM_OF_DRAWINGS], () => fetchDrawings(0, NUM_OF_DRAWINGS, true));

	const viewDrawing = (id: number) => navigate(`/drawings/${id}`);

	return (
		<Content>

			<PageHeading> Dashboard </PageHeading>
			
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
										className='hover:bg-gray-50 cursor-pointer'
										key={d.id}
										onClick={() => d.id && viewDrawing(d.id)}>
										<Table.Data> { d.drawersName } </Table.Data>
										<Table.Data> { d.drawersAge } </Table.Data>
										<Table.Data>
											<Link onClick={(e) => e.stopPropagation()} className='underline' to={`/events/${d.event.id}`}> { d.event.name } </Link>
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