import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ScoreSelector from '../ScoreSelector';

// TODO

test('Render with label', () => {

	render(<ScoreSelector label='Score' onChange={jest.fn()}/>)

	expect(screen.getByText('Score')).toBeInTheDocument();
})