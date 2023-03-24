import { Outlet, useNavigate } from 'react-router';
import { ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import Content from '../../Content';
import Heading from '../../primitives/Heading';
import PrimaryButton from '../../primitives/PrimaryButton';
import { getFriendlyDate } from '../../../utils/date';
import Table from '../../Table';
import SearchInput from '../../primitives/SearchInput';
import { fetchEventCount, fetchEvents } from '../../../../api/event';
import Pagination from '../../Pagination';
import { Link } from 'react-router-dom';

export default function Events() {

	const RECORDS_PER_PAGE = 15;
	const [page, setPage] = useState<number>(0);

	const navigate = useNavigate();

	const columns: ReactNode[] = ["ID", "Name", "Start Time", "Finish Time", "Location"];
	
	const { data: eventCount } = useQuery('eventCount', fetchEventCount);

	const { data: events } = useQuery(['events', page], () => fetchEvents(page, RECORDS_PER_PAGE), {
		keepPreviousData: true
	});	

	const viewEvent = (id: number) => navigate(`${id}`);

	return (
		<Content>

			<Heading> Events </Heading>

			<div className='flex w-full gap-4 mt-7 flex-wrap justify-end'>
				<SearchInput onChange={() => console.log(1)}/>
				<PrimaryButton onClick={() => navigate('create')}> Create Event </PrimaryButton>
			</div>

			<div className='mt-5'>

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
						{ Array.isArray(events) &&  events?.map((d, key) => {
								return (
									<Table.Row className='hover:bg-gray-100 cursor-pointer'
									key={key}
									onClick={() => d.eventId && viewEvent(d.eventId)}>
										<Table.Data> { d.eventId } </Table.Data>
										<Table.Data> { d.eventName } </Table.Data>
										<Table.Data> { getFriendlyDate(d.startTime) } </Table.Data>
										<Table.Data> { getFriendlyDate(d.finishTime) } </Table.Data>
										<Table.Data>
											<Link onClick={(e) => e.stopPropagation()} className='underline' to={`/admin/locations/view/${d.location.id}`}> { d.location.name } </Link>
										</Table.Data>
									</Table.Row>
								)
							}) }
					</Table.Body>
				</Table>
							
			</div>
			
			<Pagination current={page} count={eventCount?.count ?? 0} size={RECORDS_PER_PAGE} setPage={setPage}/>

			<Outlet/>
		</Content>
	)
}