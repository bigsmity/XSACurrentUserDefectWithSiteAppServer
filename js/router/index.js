/* eslint-env es6 */
/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

// router/index.js
// Endpoints to match when calling https://<js-module-name>.sap-wld-db.csda.gov.au:33033
// Taken from:
// https://developers.sap.com/tutorials/xsa-node-modules.html

module.exports = function (app, server) {
	// Example - match /example requests
	app.use("/example", require("./routes/example")());
};