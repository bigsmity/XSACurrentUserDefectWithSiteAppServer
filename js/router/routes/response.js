/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0 */
"use strict";

/*************************************************************************************************/
/* IMPORTS                                                                                       */
/*************************************************************************************************/

const textBundle = require("../../lib/node/i18n/textBundle");

/*************************************************************************************************/
/* PRIVATE FUNCTIONS                                                                             */
/*************************************************************************************************/

/**
 * @function Create response object
 * @param {int} status - Response HTTP status
 * @param {object} message - Message text of response
 * @param {array} params - Text params to enable text injection in message
 * @param {string} lang - Browser language
 * @returns {object}
 */
function createResponse(status, message, params, lang) {
	// If an array of parameters isn't provided, set language as params.
	// Allows params parameter to not be provided.
	if (!Array.isArray(params)) {
		lang = params;
		params = [];
	}
	// Get message from textBundle
	return {
		message: {
			message: textBundle.getText(message, params, lang)
		},
		status: status
	};
}

/*************************************************************************************************/
/* EXPORT FUNCTIONS                                                                              */
/*************************************************************************************************/

/**
 * @function Create response object for error
 * @param {object} message - Message text of response
 * @param {array} params - Text params to enable text injection in message
 * @param {string} lang - Browser language
 * @returns {object}
 */
module.exports.createError = function (message, params, lang) {
	return createResponse(400, message, params, lang);
};

/**
 * @function Create response object for success
 * @param {object} message - Message text of response
 * @param {array} params - Text params to enable text injection in message
 * @param {string} lang - Browser language
 * @returns {object}
 */
module.exports.createSuccess = function (message, params, lang) {
	return createResponse(200, message, params, lang);
};

/**
 * @function Create response object for unauthorised
 * @param {object} message - Message text of response
 * @param {array} params - Text params to enable text injection in message
 * @param {string} lang - Browser language
 * @returns {object}
 */
module.exports.createUnauthorised = function (message, params, lang) {
	return createResponse(401, message, params, lang);
};

/**
 * @function Set response info for service
 * @param {object} res - Response object
 * @param {int} status - HTTP status code
 * @param {object} body - Body of response in JSON
 * @returns
 */
module.exports.sendResponse = function (res, result) {
	res.type("application/json").status(result.status).send(result.message);
};