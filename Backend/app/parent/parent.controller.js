const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children");

let parent = (req, res, next) => {
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

let viewChild = async (req, res, next) => {
	try {
		return res.json({
			message: "View CHild",
			data: await children.find({}),
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

let reminders = (req, res, next) => {
	try {
		return res.json({
			message: "reminders",
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
	parent,
	viewChild,
	childGrowth,
	reminders,
	vaccinesInfo,
};
