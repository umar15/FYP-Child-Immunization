const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentSchema = new Schema(
	{
		parentID: { type: String, default: "vaccine center", required: true },
		role: {
			type: String,
			default: "parent",
			required: true,
			enum: ["vaccine center", "hospital", "parent", "polio worker"],
		},
		name: { type: String, default: "", required: true },
		email: { type: String, default: "", required: true },
		password: { type: String, default: "", required: true },
		contactNo: { type: String, required: true, default: "" },
		address: { type: String, required: true, default: "" },
		cnic: { type: String, required: true, default: "" },
	},
	{
		timestamps: true,
	}
);

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;
