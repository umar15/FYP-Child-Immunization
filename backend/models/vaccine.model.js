const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccineSchema = new Schema(
	{
		vaccineID: { type: String, default: "", required: true },
		name: { type: String, default: "", required: true },
		manufacturer: { type: String, default: "", required: true },
		quantity: { type: String, default: "50", required: true },
		expiryDate: { type: Date, default: Date.now, required: true },
	},
	{
		timestamps: true,
	}
);

const Vaccine = mongoose.model("Vaccine", vaccineSchema);

module.exports = Vaccine;
