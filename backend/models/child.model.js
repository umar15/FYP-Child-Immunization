const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childSchema = new Schema(
	{
		childID: { type: String, required: true, default: "" },
		parentName: { type: String, required: true, default: "" },
		parentCNIC: { type: String, required: true, default: "" },
		contactNo: { type: String, required: true, default: "" },
		address: { type: String, required: true, default: "" },
		dateOfBirth: { type: Date, required: true, default: "" },
		gender: { type: String, required: true, default: "" },
		birthPlace: { type: String, required: true, default: "" },
		siblingNo: { type: String, required: true, default: "" },
		hospitalName: { type: String, required: true, default: "" },
		vaccinationInfo: { type: String, default: "" },
	},
	{
		timestamps: true,
	}
);

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
