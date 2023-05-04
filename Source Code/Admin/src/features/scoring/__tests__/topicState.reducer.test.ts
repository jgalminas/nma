import { topicStateReducer } from '../topicState.reducer';

test('Check action - true', () => {

	const expected = [
		{ checked: true, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }
	]

	const actual = topicStateReducer(
		[{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }],
		{ type: 'CHECK', index: 0 }
	);

	expect(expected).toStrictEqual(actual);
})

test('Check action - false', () => {

	const expected = [
		{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }
	]

	const actual = topicStateReducer(
		[{ checked: true, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }],
		{ type: 'CHECK', index: 0 }
	);

	expect(expected).toStrictEqual(actual);
})

test('Update Depth action', () => {

	const expected = [
		{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 5, extent: 0, depthNotes: '', extentNotes: '' }
	]

	const actual = topicStateReducer(
		[{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }],
		{ type: 'UPDATE_DEPTH', topicId: 1, value: 5 }
	);

	expect(expected).toStrictEqual(actual);
})

test('Update Extent action', () => {

	const expected = [
		{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 5, depthNotes: '', extentNotes: '' }
	]

	const actual = topicStateReducer(
		[{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }],
		{ type: 'UPDATE_EXTENT', topicId: 1, value: 5 }
	);

	expect(expected).toStrictEqual(actual);
})

test('Update Depth Notes action', () => {

	const expected = [
		{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: 'Updated', extentNotes: '' }
	]

	const actual = topicStateReducer(
		[{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }],
		{ type: 'UPDATE_DEPTH_NOTES', topicId: 1, value: 'Updated' }
	);

	expect(expected).toStrictEqual(actual);
})

test('Update Extent Notes action', () => {

	const expected = [
		{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: 'Updated' }
	]

	const actual = topicStateReducer(
		[{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }],
		{ type: 'UPDATE_EXTENT_NOTES', topicId: 1, value: 'Updated' }
	);

	expect(expected).toStrictEqual(actual);
})

test('Set Topics action', () => {

	const expected = [
		{ checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' }
	]

	const actual = topicStateReducer(
		[],
		{
			type: 'SET_TOPICS',
			topics: [ { checked: false, topic: { id: 1, name: 'Topic 1' }, depth: 0, extent: 0, depthNotes: '', extentNotes: '' } ]
		}
	);

	expect(expected).toStrictEqual(actual);
})