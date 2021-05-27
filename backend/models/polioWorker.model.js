const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const polioWorkerSchema = new Schema(
	{
		workerID: { type: String, default: "vaccine center", required: true },
		role: {
			type: String,
			default: "polio worker",
			required: true,
			enum: ["vaccine center", "hospital", "parent", "polio worker"],
		},
		name: { type: String, default: "", required: true },
		email: { type: String, default: "", required: true },
		password: { type: String, default: "", required: true },
		contactNo: { type: String, required: true, default: "" },
		city: { type: String, required: true, default: "" },
		assignedArea: { type: String, required: true, default: "" },
		vaccineCenter: { type: String, required: true, default: "" },
	},
	{
		timestamps: true,
	}
);

const PolioWorker = mongoose.model("Polio Worker", polioWorkerSchema);

module.exports = PolioWorker;
