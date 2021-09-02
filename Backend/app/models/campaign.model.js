"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const campaignSchema = new schema({
	campaignID: { type: String, default: "", required: true },
	status: { type: String, default: "active", required: true, enum: ["active", "inactive"] },
	area: { type: String, default: "", required: true },
	noOfWorkers: { type: String, default: "5", required: true },
	startDate: { type: Date, default: Date.now() },
	endDate: { type: Date, default: Date.now() },
});

campaignSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("Campaign", campaignSchema);
