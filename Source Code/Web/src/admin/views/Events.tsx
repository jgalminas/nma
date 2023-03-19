import { Outlet, useNavigate } from 'react-router';
import { Fragment, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchRecentDrawings } from '../../api/drawing';
import Content from '../Content';
import Heading from '../primitives/Heading';
import PrimaryButton from '../primitives/PrimaryButton';
import { getFriendlyDate } from '../utils/date';
import Table from './Table';
import SearchInput from '../primitives/SearchInput';

export default function Events() {

	const navigate = useNavigate();

	const columns: ReactNode[] = ["Drawer's Name", "Drawer's Age", "Event Name", "Date Added"];

	const NUM_OF_DRAWINGS = 10;

	const { data: drawings, isLoading } = useQuery(['recentDrawings', NUM_OF_DRAWINGS], () => fetchRecentDrawings(NUM_OF_DRAWINGS));

	return (
		<Fragment>
			<Content>

				<Heading> Events </Heading>

				<div className='flex w-full gap-4 mt-7 flex-wrap justify-end'>
					<SearchInput onChange={() => console.log(1)}/>
					<PrimaryButton onClick={() => navigate('create')}> Create Event </PrimaryButton>
				</div>

				<div className='mt-5 pb-10'>

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
										<Table.Row key={d.id}>
											<Table.Data> { d.drawersName } </Table.Data>
											<Table.Data> { d.drawersAge } </Table.Data>
											<Table.Data>
												<Link className='underline' to={`/admin/events/view/${d.event.id}`}> { d.event.name } </Link>
											</Table.Data>
											<Table.Data> { getFriendlyDate(d.createdAt) } </Table.Data>
										</Table.Row>
									)
								}) }
						</Table.Body>
					</Table>

				</div>

			</Content>
			<Outlet/>
		</Fragment>
	)
}