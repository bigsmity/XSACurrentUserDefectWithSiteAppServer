/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0 */
"use strict";

// lib/node/__mocks__/example.js
// https://jestjs.io/docs/en/manual-mocks
// When module is mocked (jest.mock('module')) in test (/__tests__ folder) file,
// THIS file is used to provide mock functionality.

// Module to mock
const mock = jest.genMockFromModule("someFileToMock.js");

// Function to mock
async function functionToMock() {
	return true;
}

// Overwrite module with mocked functions
mock.functionToMock = functionToMock;

// Export mocked functions
module.exports = mock;