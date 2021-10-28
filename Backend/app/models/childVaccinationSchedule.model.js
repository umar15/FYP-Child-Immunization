"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const childVaccinationSchedule = new schema({
	child: { type: schema.Types.ObjectId, required: true, default: "", ref: "Children" },
	vaccines: {
		opv0: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		}, // polio
		opv1: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		opv2: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		opv3: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		measles0: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		measles1: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		bcg: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		}, // children TB
		pentavalent0: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pentavalent1: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pentavalent2: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pcv0: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pcv1: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
		pcv2: {
			date: { type: Date },
			done: { type: Boolean, default: false },
		},
	},
});

childVaccinationSchedule.plugin(mongoose_timestamps);
module.exports = mongoose.model("childVaccinationSchedule", childVaccinationSchedule);
