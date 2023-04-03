import { Outlet, useNavigate } from 'react-router';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import Content from '../../Content';
import Heading from '../../primitives/Heading';
import Table from '../../Table';
import SearchInput from '../../primitives/SearchInput';
import Pagination from '../../Pagination';
import { usePage } from '../../../contexts/PageContext';
import { fetchDrawingCount, fetchDrawings } from '../../../api/drawing';
import { getFriendlyDate } from '../../../utils/date';
import PrimaryButton from '../../primitives/PrimaryButton';
import PrimaryButtonSmall from '../../primitives/PrimaryButtonSmall';

export default function Drawings() {
	
	const RECORDS_PER_PAGE = 15;

	const { page, setPage } = usePage();

	const navigate = useNavigate();

	const columns: ReactNode[] = ["ID", "Drawer's Name", "Drawer's Age", "Date Added", "Scored"];
	
	const { data: drawingCount } = useQuery(['drawingCount'], fetchDrawingCount);

	const { data: drawings } = useQuery(['drawings', page], () => fetchDrawings(page, RECORDS_PER_PAGE, false), {
		keepPreviousData: true
	});	

	const viewDrawing = (id: number) => navigate(id.toString());

	return (
		<Content>

			<Heading> Drawings </Heading>

			<div className='flex w-full gap-4 mt-7 flex-wrap justify-end'>
				<SearchInput onChange={() => console.log(1)}/>
				<PrimaryButton onClick={() => console.log(1)}> Score Drawings </PrimaryButton>
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
						{ Array.isArray(drawings) &&  drawings?.map((d, key) => {
								return (
									<Table.Row className='hover:bg-gray-100 cursor-pointer'
									key={key}
									onClick={() => d.id && viewDrawing(d.id)}>
										<Table.Data> { d.id } </Table.Data>
										<Table.Data> { d.drawersName } </Table.Data>
										<Table.Data> { d.drawersAge } </Table.Data>
										<Table.Data> { getFriendlyDate(d.createdAt) } </Table.Data>
										<Table.Data>
											{ !d.isScored ?
												<div className='flex justify-end'>
													No
													<div className='ml-auto pl-2'>
														<PrimaryButtonSmall onClick={() => navigate(`score/${d.id}`)}> Score </PrimaryButtonSmall>
													</div>
												</div>
												: 'Yes'
											}
										</Table.Data>
									</Table.Row>
								)
							}) }
					</Table.Body>
				</Table>
							
			</div>
			
			<Pagination current={page} count={drawingCount?.count ?? 0} size={RECORDS_PER_PAGE} setPage={setPage}/>

			<Outlet/>
		</Content>
	)
}