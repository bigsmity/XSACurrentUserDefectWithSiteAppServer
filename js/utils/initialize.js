/* eslint-env es6 */
/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

// utils/initilize.js
// Initialises express for node and XSJS functionality, including authentication.
// Do not modify.
// Taken from:
// https://developers.sap.com/tutorials/xsa-node-modules.html

module.exports = {
	initExpress: function () {
		var xsenv = require("@sap/xsenv");
		var passport = require("passport");
		var xssec = require("@sap/xssec");
		var xsHDBConn = require("@sap/hdbext");
		var express = require("express");

		//logging
		var logging = require("@sap/logging");
		var appContext = logging.createAppContext();

		//Initialize Express App for XS UAA and HDBEXT Middleware
		var app = express();
		var hanaOptions = xsenv.getServices({
			hana: {
				tag: "hana"
			}
		});
		//Build a JWT Strategy from the bound UAA resource
		passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
			uaa: {
				tag: "xsuaa"
			}
		}).uaa));
		//Add Passport for Authentication via JWT + HANA DB connection as Middleware in Expess
		app.use(
			xsHDBConn.middleware(hanaOptions.hana),
			passport.authenticate("JWT", {
				session: false
			})
		);
		return app;
	},
	initXSJS: function (app) {
		//	process.env.XS_APP_LOG_LEVEL='debug';
		var xsjs = require("@sap/xsjs");
		var xsenv = require("@sap/xsenv");
		var options = {
			anonymous: true, // remove to authenticate calls
			redirectUrl: "/index.xsjs",
			context: {
				base: global.__base,
				env: process.env
			}
		};

		//configure HANA
		try {
			options = Object.assign(options, xsenv.getServices({
				hana: {
					tag: "hana"
				}
			}));
			options = Object.assign(options, xsenv.getServices({
				secureStore: {
					tag: "hana"
				}
			}));
		} catch (err) {
			console.log("[WARN]", err.message);
		}

		// configure UAA
		try {
			options = Object.assign(options, xsenv.getServices({
				"uaa": {
					tag: "xsuaa"
				}
			}));
		} catch (err) {
			console.log("[WARN]", err.message);
		}

		// configure AuditLog
		try {
			options = Object.assign(options, xsenv.getServices({
				"auditLog": {
					tag: "auditlog"
				}
			}));
		} catch (err) {
			console.log("[WARN]", err.message);
		}
		// start server
		var xsjsApp = xsjs(options);
		app.use(xsjsApp);
	}
};