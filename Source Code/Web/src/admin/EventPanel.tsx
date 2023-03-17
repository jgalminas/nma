import { useParams } from 'react-router';
import Panel from './Panel';

export interface EventPanelProps {
	
}

export default function EventPanel({  }: EventPanelProps) {

	const { id } = useParams();

	return (
		<Panel>
			{ id }
		</Panel>
	)
}