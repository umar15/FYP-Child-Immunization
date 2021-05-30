const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema(
	{
		campaignID: { type: String, default: "", required: true },
		status: { type: String, default: "active", required: true, enum: ["active", "inactive"] },
		area: { type: String, default: "", required: true },
		noOfWorkers: { type: String, default: "5", required: true },
		startDate: { type: Date, default: Date.now },
		endDate: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
