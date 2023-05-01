export default {
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
	},
	testEnvironment: "jsdom"
}