import { Outlet, useNavigate } from 'react-router';
import { ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Content from '../../components/Content';
import PageHeading from '../../components/PageHeading';
import PrimaryButton from '../../components/PrimaryButton';
import { getFriendlyDate } from '../../utils/date';
import Table from '../../components/Table';
import SearchInput from '../../components/SearchInput';
import { fetchEventCount, fetchEvents } from './event.api';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { usePage } from '../../contexts/PageContext';

export default function Events() {
	
	const RECORDS_PER_PAGE = 15;
	const { page, setPage } = usePage();

	const navigate = useNavigate();

	const columns: ReactNode[] = ["ID", "Name", "Start Time", "Finish Time", "Location"];
	
	const { data: eventCount } = useQuery(['eventCount'], fetchEventCount);

	const { data: events } = useQuery(['events', page], () => fetchEvents(page, RECORDS_PER_PAGE), {
		keepPreviousData: true
	});	

	const viewEvent = (id: number) => navigate(`${id}`);

	return (
		<Content>

			<PageHeading> Events </PageHeading>

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
									<Table.Row className='hover:bg-gray-50 cursor-pointer'
									key={key}
									onClick={() => d.eventId && viewEvent(d.eventId)}>
										<Table.Data> { d.eventId } </Table.Data>
										<Table.Data> { d.eventName } </Table.Data>
										<Table.Data> { getFriendlyDate(d.startTime) } </Table.Data>
										<Table.Data> { getFriendlyDate(d.finishTime) } </Table.Data>
										<Table.Data>
											<Link onClick={(e) => e.stopPropagation()} className='underline' to={`/locations/${d.location.id}`}> { d.location.name } </Link>
										</Table.Data>
									</Table.Row>
								)
							}) }
					</Table.Body>
				</Table>
							
			</div>
			
			<div className='mt-auto'>
				<Pagination current={page} count={eventCount?.count ?? 0} size={RECORDS_PER_PAGE} setPage={setPage}/>
			</div>

			<Outlet/>
		</Content>
	)
}