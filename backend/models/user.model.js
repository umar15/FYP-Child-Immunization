const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		userID: { type: String, default: "", required: true },
		role: {
			type: String,
			default: "",
			required: true,
			enum: ["vaccine center", "hospital", "parent", "polio worker"],
		},
		name: { type: String, default: "", required: true },
		email: { type: Number, default: 5, required: true },
		password: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
