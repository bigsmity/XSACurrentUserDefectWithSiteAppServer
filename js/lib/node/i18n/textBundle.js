/* eslint-env es6 */
/* eslint no-console: 0, no-unused-vars: 0 */
"use strict";

// lib/node/i18n/textBundle.js
// Taken from:
// https://developers.sap.com/tutorials/xsa-node-text.html

const express = require("express");
const os = require("os");
const TextBundle = require("@sap/textbundle").TextBundle;
//const langparser = require("accept-language-parser");

function getLocale(lang) {
	//var lang = req.headers["accept-language"];
	if (!lang) {
		return;
	}
	let arr;
	if (lang.indexOf(";") >= 0) {
		arr = lang.substring(0, lang.indexOf(";")).split(",");
	} else {
		arr = [lang];
	}
	//var arr = langparser.parse(lang);
	//if (!arr || arr.length < 1) {
	//	return;
	//}
	//var locale = arr[0].code;

	var locale = arr[0].substring(0, arr[0].indexOf("-"));

	//if (arr[0].region) {
	//	locale += "_" + arr[0].region;
	//}

	locale += "_" + arr[0].substring(arr[0].indexOf("-") + 1);
	return locale;
}

module.exports = function () {
	var app = express.Router();

	app.get("/", (req, res) => {
		//var lang = req.acceptsLanguages('en', 'fr');
		//var bundle = new TextBundle(global.__base + "messages", getLocale(req));
		var bundle = new TextBundle("messages", getLocale(req.headers["accept-language"]));
		res.writeHead(200, {
			"Content-Type": "text/plain; charset=utf-8"
		});
		var greeting = bundle.getText("greeting", [os.hostname(), os.type()]);
		res.end(greeting, "utf-8");
		//res.end(String(getLocale(req)));
	});

	return app;
};

module.exports.getText = function (key, params, lang) {
	// If an array of parameters isn't provided, set language as params.
	// Allows params parameter to not be provided.
	if (!Array.isArray(params)) {
		lang = params;
		params = [];
	}
	var bundle = new TextBundle("messages", getLocale(lang));
	var text = bundle.getText(key, params);
	return text;
};