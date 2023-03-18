import { useParams } from 'react-router';
import Panel from './Panel';

export const PANEL_MODE = {
	VIEW : 0,
	EDIT : 1,
	CREATE : 2
}

export interface EventPanelProps {
	mode?: number // for rendering buttons/components based on the action
}

export default function EventPanel({ mode = PANEL_MODE.VIEW }: EventPanelProps) {

	const { id } = useParams();

	return (
		<Panel>
			{ id }
		</Panel>
	)
}