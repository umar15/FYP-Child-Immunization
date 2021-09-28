const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	vaccine = mongoose.model("Vaccine"),
	assignVaccineTo = mongoose.model("assignVaccineTo"),
	orgVaccines = mongoose.model("organizationVaccines"),
	users = mongoose.model("userAccounts");

let subadmin = (req, res, next) => {
	try {
		return res.json({
			message: "Sub Admin",
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
			message: "Children",
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

let viewVaccines = async (req, res, next) => {
	try {
		const subadminVaccines = await orgVaccines.find({ organization: req.user._id });
		return res.json({
			message: "Subadmin Vaccines",
			data: subadminVaccines,
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let getHospitals = async (req, res, next) => {
	try {
		return res.json({
			message: "Hospitals",
			data: await users.find({ userType: "hospital" }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let getVaccineCenters = async (req, res, next) => {
	try {
		return res.json({
			message: "Vaccine center",
			data: await users.find({ userType: "vaccine center" }),
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

let assignVaccine = async (req, res, next) => {
	try {
		const org = await users.findOne({ _id: req.params.id });
		if (!org) {
			throw "No organization found with that name.";
		}

		const organizationVacc = await orgVaccines.findOne({ organization: org._id });
		if (!organizationVacc) {
			throw "No vaccines available for this organization.";
		}

		const subadminVaccines = await orgVaccines.findOne({ organization: req.user._id });
		if (!subadminVaccines) {
			throw "No vaccines available for this subadmin.";
		}

		const orgVacc = {
			organization: org,
			vaccines: {
				polio: {
					quantity:
						req.body.vaccine === "polio"
							? req.body.quantity + organizationVacc.vaccines.polio.quantity
							: organizationVacc.vaccines.polio.quantity,
				},
				diphtheria: {
					quantity:
						req.body.vaccine === "diphteria"
							? req.body.quantity + organizationVacc.vaccines.diphtheria.quantity
							: organizationVacc.vaccines.diphtheria.quantity,
				},
				homophiles: {
					quantity:
						req.body.vaccine === "homophiles"
							? req.body.quantity + organizationVacc.vaccines.homophiles.quantity
							: organizationVacc.vaccines.homophiles.quantity,
				},
				rotaVirus: {
					quantity:
						req.body.vaccine === "rotaVirus"
							? req.body.quantity + organizationVacc.vaccines.rotaVirus.quantity
							: organizationVacc.vaccines.rotaVirus.quantity,
				},
				measles: {
					quantity:
						req.body.vaccine === "measles"
							? req.body.quantity + organizationVacc.vaccines.measles.quantity
							: organizationVacc.vaccines.measles.quantity,
				},
				hepatitisA: {
					quantity:
						req.body.vaccine === "hepatitusA"
							? req.body.quantity + organizationVacc.vaccines.hepatitisA.quantity
							: organizationVacc.vaccines.hepatitisA.quantity,
				},
				hepatitisB: {
					quantity:
						req.body.vaccine === "hepatitusB"
							? req.body.quantity + organizationVacc.vaccines.hepatitisB.quantity
							: organizationVacc.vaccines.hepatitisB.quantity,
				},
				papillomaVirus: {
					quantity:
						req.body.vaccine === "papillomaVirus"
							? req.body.quantity + organizationVacc.vaccines.papillomaVirus.quantity
							: organizationVacc.vaccines.papillomaVirus.quantity,
				},
				influenza: {
					quantity:
						req.body.vaccine === "influenza"
							? req.body.quantity + organizationVacc.vaccines.influenza.quantity
							: organizationVacc.vaccines.influenza.quantity,
				},
			},
		};

		const remainingVaccines = {
			organization: subadminVaccines.organization,
			vaccines: {
				polio: {
					quantity:
						req.body.vaccine === "polio"
							? subadminVaccines.vaccines.polio.quantity - req.body.quantity
							: subadminVaccines.vaccines.polio.quantity,
				},
				diphtheria: {
					quantity:
						req.body.vaccine === "diphteria"
							? subadminVaccines.vaccines.diphtheria.quantity - req.body.quantity
							: subadminVaccines.vaccines.diphtheria.quantity,
				},
				homophiles: {
					quantity:
						req.body.vaccine === "homophiles"
							? subadminVaccines.vaccines.homophiles.quantity - req.body.quantity
							: subadminVaccines.vaccines.homophiles.quantity,
				},
				rotaVirus: {
					quantity:
						req.body.vaccine === "rotaVirus"
							? subadminVaccines.vaccines.rotaVirus.quantity - req.body.quantity
							: subadminVaccines.vaccines.rotaVirus.quantity,
				},
				measles: {
					quantity:
						req.body.vaccine === "measles"
							? subadminVaccines.vaccines.measles.quantity - req.body.quantity
							: subadminVaccines.vaccines.measles.quantity,
				},
				hepatitisA: {
					quantity:
						req.body.vaccine === "hepatitusA"
							? subadminVaccines.vaccines.hepatitisA.quantity - req.body.quantity
							: subadminVaccines.vaccines.hepatitisA.quantity,
				},
				hepatitisB: {
					quantity:
						req.body.vaccine === "hepatitusB"
							? subadminVaccines.vaccines.hepatitisB.quantity - req.body.quantity
							: subadminVaccines.vaccines.hepatitisB.quantity,
				},
				papillomaVirus: {
					quantity:
						req.body.vaccine === "papillomaVirus"
							? subadminVaccines.vaccines.papillomaVirus.quantity - req.body.quantity
							: organizationVacc.vaccines.papillomaVirus.quantity,
				},
				influenza: {
					quantity:
						req.body.vaccine === "influenza"
							? subadminVaccines.vaccines.influenza.quantity - req.body.quantity
							: subadminVaccines.vaccines.influenza.quantity,
				},
			},
		};

		await orgVaccines.findOneAndUpdate({ _id: organizationVacc._id }, orgVacc, { new: true });
		await orgVaccines.findOneAndUpdate({ _id: subadminVaccines._id }, remainingVaccines, { new: true });

		return res.json({
			message: "vaccine assigned successfully.",
			data: {
				orgVaccineDetails: orgVacc,
				subadminRemainingVaccines: remainingVaccines,
			},
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

module.exports = {
	subadmin,
	viewChildren,
	viewChild,
	viewVaccines,
	addVaccine,
	updateVaccine,
	deleteVaccine,
	getHospitals,
	getVaccineCenters,
	futureCases,
	futureVaccineNeeds,
	assignVaccine,
};
