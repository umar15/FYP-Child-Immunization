"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const childrenSchema = new schema({
	childID: { type: String, required: true, default: "" },
	parentName: { type: String, required: true, default: "" },
	parentCNIC: { type: String, required: true, default: "" },
	contactNo: { type: String, required: true, default: "" },
	emergencyContact: { type: String, required: true, default: "" },
	address: {
		addr: { type: String, default: "", required: true },
		area: { type: String, default: "", required: true },
		city: { type: String, default: "", required: true },
	},
	dateOfBirth: { type: Date, required: true, default: Date.now() },
	gender: { type: String, required: true, default: "" },
	birthPlace: { type: String, required: true, default: "" },
	siblingNo: { type: Number, required: true, default: 1 },
	hospitalName: { type: schema.Types.ObjectId, required: true, ref: "userAccounts" },
	vaccination: [
		{
			polio: { noOfDoses: { type: Number, default: 0 } },
			diphtheria: { noOfDoses: { type: Number, default: 0 } },
			homophiles: { noOfDoses: { type: Number, default: 0 } },
			rotaVirus: { noOfDoses: { type: Number, default: 0 } },
			measles: { noOfDoses: { type: Number, default: 0 } },
			hepatitisA: { noOfDoses: { type: Number, default: 0 } },
			hepatitisB: { noOfDoses: { type: Number, default: 0 } },
			papillomaVirus: { noOfDoses: { type: Number, default: 0 } },
			influenza: { noOfDoses: { type: Number, default: 0 } },
		},
	],
});

childrenSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("Children", childrenSchema);
