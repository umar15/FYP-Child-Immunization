const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childSchema = new Schema(
	{
		childID: { type: String, required: true },
		parentName: { type: String, required: true },
		parentCNIC: { type: String, required: true },
		contactNo: { type: String, required: true },
		address: { type: String, required: true },
		dateOfBirth: { type: Date, required: true },
		gender: { type: String, required: true },
		birthPlace: { type: String, required: true },
		siblingNo: { type: Number, required: true },
		hospitalName: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
