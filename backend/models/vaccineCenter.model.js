const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccineSchema = new Schema(
	{
		vaccineID: { type: String, default: "", required: true },
		name: { type: String, default: "", required: true, enum: ["active", "inactive"] },
		manufacturer: { type: String, default: "", required: true },
		quantity: { type: Number, default: 50, required: true },
		expiryDate: { type: Date, default: Date.now, required: true },
	},
	{
		timestamps: true,
	}
);

const VaccineCenter = mongoose.model("Vaccine Center", vaccineCenterSchema);

module.exports = VaccineCenter;
