"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const dailyConsumptionSchema = new schema({
	vaccineName: { type: schema.Types.ObjectId, required: true, ref: "Vaccine" },
	date: { type: Date, default: Date.now(), require: true },
	gender: { type: String, default: "", enum: ["male", "female"] },
	region: { type: String, default: "" },
	organization: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
});

dailyConsumptionSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("dailyConsumption", dailyConsumptionSchema);
