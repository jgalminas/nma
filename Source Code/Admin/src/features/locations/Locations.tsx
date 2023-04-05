import { Outlet, useNavigate } from 'react-router';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import Content from '../../components/Content';
import PageHeading from '../../components/PageHeading';
import PrimaryButton from '../../components/PrimaryButton';
import Table from '../../components/Table';
import SearchInput from '../../components/SearchInput';
import Pagination from '../../components/Pagination';
import { fetchLocationCount, fetchLocations } from './location.api';
import { usePage } from '../../contexts/PageContext';

export default function Locations() {
	
	const RECORDS_PER_PAGE = 15;

	const { page, setPage } = usePage();

	const navigate = useNavigate();

	const columns: ReactNode[] = ["Name", "City", "Country"];
	
	const { data: locationCount } = useQuery(['locationCount'], fetchLocationCount);

	const { data: locations } = useQuery(['locations', page], () => fetchLocations(page, RECORDS_PER_PAGE), {
		keepPreviousData: true
	});	

	const viewLocation = (id: number) => navigate(`${id}`);

	return (
		<Content>

			<PageHeading> Locations </PageHeading>

			<div className='flex w-full gap-4 mt-7 flex-wrap justify-end'>
				<SearchInput onChange={() => console.log(1)}/>
				<PrimaryButton onClick={() => navigate('create')}> Create Location </PrimaryButton>
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
						{ Array.isArray(locations) &&  locations?.map((d, key) => {
								return (
									<Table.Row className='hover:bg-gray-50 cursor-pointer'
									key={key}
									onClick={() => d.locationId && viewLocation(d.locationId)}>
										<Table.Data> { d.locationName } </Table.Data>
										<Table.Data> { d.city } </Table.Data>
										<Table.Data> { d.country } </Table.Data>
									</Table.Row>
								)
							}) }
					</Table.Body>
				</Table>
							
			</div>
			
			<div className='mt-auto'>
				<Pagination current={page} count={locationCount?.count ?? 0} size={RECORDS_PER_PAGE} setPage={setPage}/>
			</div>

			<Outlet/>
		</Content>
	)
}