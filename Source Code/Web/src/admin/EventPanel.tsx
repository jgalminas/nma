import { useParams } from 'react-router';
import Panel from './Panel';
import { useQuery } from 'react-query';
import { fetchEventById } from '../api/event';
import PANEL_MODE from './enums/panel';

export interface EventPanelProps {
	mode?: number // for rendering buttons/components based on the action
}

export default function EventPanel({ mode = PANEL_MODE.VIEW }: EventPanelProps) {

	const { id } = useParams();

	// react query test
	const { isLoading, isSuccess, data } = useQuery(`event-${id}`, () => fetchEventById(Number(id)));

	return (
		<Panel>
			{ isSuccess && data.eventName }
		</Panel>
	)
}