const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	vaccine = mongoose.model("Vaccine"),
	campaign = mongoose.model("Campaign"),
	orgVaccines = mongoose.model("organizationVaccines"),
	users = mongoose.model("userAccounts");

let vaccineCenter = (req, res, next) => {
	try {
		return res.json({
			message: "vaccine Center",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewChildren = async (req, res, next) => {
	try {
		return res.json({
			message: "View Children",
			data: await children.find({}),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewChild = async (req, res, next) => {
	try {
		return res.json({
			message: "Child",
			data: await children.findOne({ _id: req.params.id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateChild = async (req, res, next) => {
	try {
		const newChild = await children.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		return res.json({
			message: "Child updated successfully.",
			data: {
				child: newChild,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewVaccines = async (req, res, next) => {
	try {
		return res.json({
			message: "Vaccines data",
			data: await orgVaccines.find({ organization: req.user._id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addVaccine = async (req, res, next) => {
	try {
		const newVaccine = await new vaccine(req.body).save();

		return res.json({
			message: "Vaccine added successfully.",
			data: { vaccine: newVaccine },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateVaccine = async (req, res, next) => {
	try {
		const newVaccine = await vaccine.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		return res.json({
			message: "Vaccine updated successfully.",
			data: { vaccine: newVaccine },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteVaccine = async (req, res, next) => {
	await vaccine.findByIdAndDelete({ _id: req.params.id });
	try {
		return res.json({
			message: "Vaccine deleted successfully.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let requestVaccineStock = (req, res, next) => {
	try {
		return res.json({
			message: "Delete vaccine",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewCampaigns = async (req, res, next) => {
	try {
		return res.json({
			message: "campaigns",
			data: await campaign.find({ vaccineCenter: req.user._id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addCampaigns = async (req, res, next) => {
	try {
		const newCampaign = await new campaign(req.body).save();
		return res.json({
			message: "Campaign added successfully.",
			data: {
				campaign: newCampaign,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateCampaigns = async (req, res, next) => {
	try {
		const newCampaign = await campaign.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		return res.json({
			message: "campaign updated successfully.",
			data: {
				campaign: newCampaign,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteCampaigns = async (req, res, next) => {
	try {
		await campaign.findByIdAndDelete({ _id: req.params.id });
		return res.json({
			message: "Campaign deleted successfully.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let futureCases = (req, res, next) => {
	try {
		return res.json({
			message: "future cases",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let notifyPublic = (req, res, next) => {
	try {
		return res.json({
			message: "notify public",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let futureVaccineNeeds = (req, res, next) => {
	try {
		return res.json({
			message: "future vaccine needs",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewWorkers = async (req, res, next) => {
	try {
		return res.json({
			message: "Polio workers",
			data: await users.find({ userType: "worker", parentOrg: req.user._id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addWorker = async (req, res, next) => {
	try {
		const newUser = await new users(req.body).save();
		const orgVacc = {
			organization: newUser._id,
			vaccines: {
				polio: { quantity: 0 },
				diphtheria: { quantity: 0 },
				homophiles: { quantity: 0 },
				rotaVirus: { quantity: 0 },
				measles: { quantity: 0 },
				hepatitisA: { quantity: 0 },
				hepatitisB: { quantity: 0 },
				papillomaVirus: { quantity: 0 },
				influenza: { quantity: 0 },
			},
		};
		const newVaccines = await new orgVaccines(orgVacc).save();
		return res.json({
			message: "Polio worker added successfully.",
			data: {
				worker: newUser,
				vaccines: newVaccines,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateWorker = async (req, res, next) => {
	try {
		const newSubAdmin = await users.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		return res.json({
			message: "Worker updated successfully.",
			data: {
				subAdmin: newSubAdmin,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteWorker = async (req, res, next) => {
	try {
		const user = await users.findByIdAndDelete({ _id: req.params.id });
		const org = await orgVaccines.findOne({ organization: user._id });
		await orgVaccines.findByIdAndDelete({ _id: org._id });
		return res.json({
			message: "Polio worker deleted successfully.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

module.exports = {
	vaccineCenter,
	viewChildren,
	viewChild,
	updateChild,
	viewVaccines,
	addVaccine,
	updateVaccine,
	deleteVaccine,
	viewCampaigns,
	addCampaigns,
	deleteCampaigns,
	updateCampaigns,
	futureCases,
	futureVaccineNeeds,
	notifyPublic,
	requestVaccineStock,
	addWorker,
	deleteWorker,
	updateWorker,
	viewWorkers,
};
