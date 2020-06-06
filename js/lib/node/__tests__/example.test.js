/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0 */
"use strict";

// lib/node/__tests__/example.test.js
// File containing tests for module "example.js".
// Mock functionality in required modules.

// To run:
// Right-click on "js" folder
// Select Run > Run Configurations
// Select + > Run as Node.js Test
// Update name to "Run script test jest"
// Select Script Name as "testJest"
// Select Save and Run
// From now on, can just run "Run script test jest"
// Output will print to WebIDE console

// Using Matchers:
// https://jestjs.io/docs/en/using-matchers

// Testing Asynchronous Code:
// https://jestjs.io/docs/en/asynchronous

// Setup and Teardown:
// https://jestjs.io/docs/en/setup-teardown

// Mock Functions:
// https://jestjs.io/docs/en/mock-functions.html

// The Jest Object:
// https://jestjs.io/docs/en/jest-object

/*************************************************************************************************/
/* MODULE IMPORT AND MOCK                                                                        */
/*************************************************************************************************/

// Module to mock
// Mocked functionality comes from corresponding __mocks__ module
//jest.mock("someFileToMock.js");

// Module to test
//const example = require("example.js");

/*************************************************************************************************/
/* TEST SETUP                                                                                    */
/*************************************************************************************************/

beforeEach(() => {
	// do something before each test
	jest.clearAllMocks();
});

afterEach(() => {
	// do something after each test
});

beforeAll(() => {
	// do something before any test has run
});

afterAll(() => {
	// do something after all tests have run
});

/*************************************************************************************************/
/* TESTS                                                                                         */
/*************************************************************************************************/

/*describe("doing a set of things", () => {
    // beforeEach, afterEach, beforeAll, afterAll
    // need to be defined in here to work inside
    // describe
});*/

test("should always pass", async() => {
	//let data = await example.someFunctionToTest();
	//expect(data).toEqual([]);
	expect(true).toBeTruthy();
});