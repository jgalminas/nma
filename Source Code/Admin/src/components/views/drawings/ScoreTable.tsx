import { Score } from '../../../admin.types';
import Table from '../../Table';

export interface ScoreTableProps {
	score: Score
}

export default function ScoreTable({ score }: ScoreTableProps) {
	return (
		<Table className='outline-none w-full text-gray-600 divide-y divide-gray-200 rounded-md' overrideClass>
			<Table.Head overrideClass>
				<Table.Row>
					<Table.Heading/>
					<Table.Heading> Depth </Table.Heading>
					<Table.Heading> Extent </Table.Heading>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{ score.topicScores.map((ts, key) => {
					return (
						<Table.Row key={key}>
							<Table.Heading> { ts.topicName } </Table.Heading>
							<Table.Data> { ts.depth } </Table.Data>
							<Table.Data> { ts.extent } </Table.Data>
						</Table.Row>
					)
				}) }
			</Table.Body>
		</Table>
	)
}