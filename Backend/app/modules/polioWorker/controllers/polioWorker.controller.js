const winston = require("../../../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children");

let polioWorker = (req, res, next) => {
	try {
		return res.json({
			message: "Parent",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateChild = (req, res, next) => {
	try {
		return res.json({
			message: "update CHild",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccinesInfo = (req, res, next) => {
	try {
		return res.json({
			message: "vaccines info.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let polioSymptoms = (req, res, next) => {
	try {
		return res.json({
			message: "polio symptoms",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let childGrowth = (req, res, next) => {
	try {
		return res.json({
			message: "child growth.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

module.exports = {
	polioWorker,
	updateChild,
	childGrowth,
	polioSymptoms,
	vaccinesInfo,
};
