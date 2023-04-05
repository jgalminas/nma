import { useParams } from 'react-router';
import Content from '../../components/Content';
import PageHeading from '../../components/PageHeading';
import Image from '../../components/Image';
import { useQuery } from '@tanstack/react-query';
import { fetchDrawingById, fetchImage } from '../../api/sharedDrawing.api';

export default function Scoring() {

	const { id } = useParams();
	const { data: drawing } = useQuery(['drawing', Number(id)], () => fetchDrawingById(Number(id)));
	const { data: image, isLoading: isImageLoading } = useQuery(['image', Number(id)], () => fetchImage(drawing?.imageUrl ?? ''), { enabled: !!drawing });

	return (
		<Content>

			<PageHeading> Scoring </PageHeading>

			<div className='mt-7 bg-white flex-grow rounded-md border-gray-200 border flex p-5 gap-5'>
				
				<div className='flex-grow'>

				<h2 className='text-xl text-gray-700'> Drawing </h2>
				<h3 className='text-gray-600 mb-5'> { id } </h3>
				
				<Image isLoading={isImageLoading} url={image}/>
				</div>

				<div className='h-full border-l border-gray-200'/>

				<div className='w-80 h-full overflow-y-auto'>
					
				</div>

			</div>

		</Content>
	)
}