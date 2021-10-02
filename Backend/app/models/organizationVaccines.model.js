"use strict";

const mongoose = require("mongoose"),
	mongoose_timestamps = require("mongoose-timestamp");

const schema = mongoose.Schema;

const organizationVaccinesSchema = new schema({
	organization: { type: schema.Types.ObjectId, required: true, default: "", ref: "userAccounts" },
	vaccines: {
		polio: { quantity: Number, default: 0 },
		diphtheria: { quantity: Number, default: 0 },
		homophiles: { quantity: Number, default: 0 },
		rotaVirus: { quantity: Number, default: 0 },
		measles: { quantity: Number, default: 0 },
		hepatitisA: { quantity: Number, default: 0 },
		hepatitisB: { quantity: Number, default: 0 },
		papillomaVirus: { quantity: Number, default: 0 },
		influenza: { quantity: Number, default: 0 },
	},
});

organizationVaccinesSchema.plugin(mongoose_timestamps);
module.exports = mongoose.model("organizationVaccines", organizationVaccinesSchema);
