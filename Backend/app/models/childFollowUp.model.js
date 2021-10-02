"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const childFollowUpSchema = new schema({
	child: { type: schema.Types.ObjectId, required: true, ref: "Child" },
	date: { type: Date, default: Date.now() },
	nextDate: { type: Date, default: Date.now() },
	vaccineName: { type: schema.Types.ObjectId, required: true, ref: "Vaccine" },
	organization: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
	confirmationCode: { type: String, default: "" },
});

childFollowUpSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("childFollowUp", childFollowUpSchema);
