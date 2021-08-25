"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const organizationVaccinesSchema = new schema({
	organization: { type: schema.Types.ObjectId, required: true, default: "", ref: "userAccounts" },
	vaccines: [
		{
			polio: { remainingQuantity: Number, default: 0 },
			diphtheria: { remainingQuantity: Number, default: 0 },
			homophiles: { remainingQuantity: Number, default: 0 },
			rotaVirus: { remainingQuantity: Number, default: 0 },
			measles: { remainingQuantity: Number, default: 0 },
			hepatitisA: { remainingQuantity: Number, default: 0 },
			hepatitisB: { remainingQuantity: Number, default: 0 },
			papillomaVirus: { remainingQuantity: Number, default: 0 },
			influenza: { remainingQuantity: Number, default: 0 },
		},
	],
});

organizationVaccinesSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("organizationVaccines", organizationVaccinesSchema);
