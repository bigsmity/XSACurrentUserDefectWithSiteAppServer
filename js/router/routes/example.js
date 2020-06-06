/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0 */
"use strict";

// router/routes/example.js
// Example route handler

/*************************************************************************************************/
/* IMPORTS                                                                                       */
/*************************************************************************************************/

const express = require("express");
const Response = require("./response");

/*************************************************************************************************/
/* MAIN                                                                                          */
/*************************************************************************************************/

// Wrapper to make route asynchronous for express.Router()
const asyncRoute = route => (req, res, next = console.error) => Promise.resolve(route(req, res)).catch(next);

const routeHandler = async(req, res) => {
	// Get auth token
	const token = req.authInfo.token;
	// Get browser language
	const lang = req.headers["accept-language"];
	// Ensure an auth token was provided
	if (token) {
		try {
			// Get client connection to the db
			const client = req.db;
			// Send user id in response
			Response.sendResponse(res, {
				status: 200,
				message: {
					response: "SUCCESS"
				}
			});
		} catch (e) {
			Response.sendResponse(res, {
				status: 400,
				message: {
					ERROR: e
				}
			});
		}
	} else {
		// No auth token provided
		Response.sendResponse(res, Response.createUnauthorised("NO_AUTH_TOKEN", lang));
	}
}

// Called and run automatically in router/index.js when "/example" path is hit
module.exports = function () {
	var app = express.Router();

	// Handle /example/get route for GET requests
	app.get("/get", asyncRoute(routeHandler));

	// Handle /example/post route for POST requests 
	app.post("/post", asyncRoute(routeHandler));

	return app;
};