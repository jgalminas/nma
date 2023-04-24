import ScorePanel from '../ScorePanel';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { TopicState } from '../Scoring';

test('Primary button should be "Submit Score" when on last topic', () => {

	let section = 0;

	const scores = [
		{ checked: true, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }
	];

	render(<ScorePanel scores={scores} section={section} onSubmit={jest.fn()} dispatch={jest.fn()} setSection={(e) => section = e}/>);
	
	expect(screen.getByText('Submit Score')).toBeInTheDocument();
})

test('Primary button should be "Next" when not on last topic', () => {

	let section = 0;

	const scores = [
		{ checked: true, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' },
		{ checked: true, topic: { id: 2, name: 'Topic 2' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }
	];
	
	render(<ScorePanel scores={scores} section={section} onSubmit={jest.fn()} dispatch={jest.fn()} setSection={(e) => section = e}/>);
	
	expect(screen.getByText('Next')).toBeInTheDocument();
})

test('Primary button should be "Submit Score" when no topics are selected', () => {

	let section = -1;

	const scores: TopicState[] = [];
	
	render(<ScorePanel scores={scores} section={section} onSubmit={jest.fn()} dispatch={jest.fn()} setSection={(e) => section = e}/>);
	
	expect(screen.getByText('Submit Score')).toBeInTheDocument();
})

test('Selected topic is displayed', () => {

	let section = 0;

	const scores = [
		{ checked: true, topic: { id: 2, name: 'Topic 2' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }
	];
	
	render(<ScorePanel scores={scores} section={section} onSubmit={jest.fn()} dispatch={jest.fn()} setSection={(e) => section = e}/>);
	
	expect(screen.getByRole('heading', { name: 'Topic 2 Score' })).toBeInTheDocument();
	expect(screen.getByText('Depth')).toBeInTheDocument();
	expect(screen.getByText('Extent')).toBeInTheDocument();
	expect(screen.getByText('Depth Notes')).toBeInTheDocument();
	expect(screen.getByText('Depth Notes')).toBeInTheDocument();
})