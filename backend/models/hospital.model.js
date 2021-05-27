const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hospitalSchema = new Schema(
	{
		hospitalID: { type: String, default: "hospital", required: true },
		role: {
			type: String,
			default: "",
			required: true,
			enum: ["vaccine center", "hospital", "parent", "polio worker"],
		},
		name: { type: String, default: "", required: true },
		email: { type: String, default: "", required: true },
		password: { type: String, default: "", required: true },
		area: { type: String, default: "", required: true },
		city: { type: String, default: "", required: true },
		address: { type: String, default: "", required: true },
	},
	{
		timestamps: true,
	}
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
