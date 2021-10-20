const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	vaccine = mongoose.model("Vaccine"),
	assignVaccineTo = mongoose.model("assignVaccineTo"),
	orgVaccines = mongoose.model("organizationVaccines"),
	users = mongoose.model("userAccounts"),
	vaccineRequest = mongoose.model("vaccineRequest"),
	userRequestsModel = mongoose.model("userRequests"),
	subadminVaccineRequest = mongoose.model("subadminVaccineRequest"),
	nodemailer = require("nodemailer");

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
				opv: {
					quantity:
						Vaccine.name === "opv"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.opv.quantity
							: organizationVacc.vaccines.opv.quantity,
				},
				measles: {
					quantity:
						Vaccine.name === "measles"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.measles.quantity
							: organizationVacc.vaccines.measles.quantity,
				},
				bcg: {
					quantity:
						Vaccine.name === "bcg"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.bcg.quantity
							: organizationVacc.vaccines.bcg.quantity,
				},
				pentavalent: {
					quantity:
						Vaccine.name === "pentavalent"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.pentavalent.quantity
							: organizationVacc.vaccines.pentavalent.quantity,
				},
				pcv: {
					quantity:
						Vaccine.name === "pcv"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.pcv.quantity
							: organizationVacc.vaccines.pcv.quantity,
				},
			},
		};

		const remainingVaccines = {
			organization: subadminVaccines.organization,
			vaccines: {
				opv: {
					quantity:
						req.body.vaccine === "opv"
							? subadminVaccines.vaccines.opv.quantity - req.body.quantity
							: subadminVaccines.vaccines.opv.quantity,
				},
				measles: {
					quantity:
						req.body.vaccine === "measles"
							? subadminVaccines.vaccines.measles.quantity - req.body.quantity
							: subadminVaccines.vaccines.measles.quantity,
				},
				bcg: {
					quantity:
						req.body.vaccine === "bcg"
							? subadminVaccines.vaccines.bcg.quantity - req.body.quantity
							: subadminVaccines.vaccines.bcg.quantity,
				},
				pentavalent: {
					quantity:
						req.body.vaccine === "pentavalent"
							? subadminVaccines.vaccines.pentavalent.quantity - req.body.quantity
							: subadminVaccines.vaccines.pentavalent.quantity,
				},
				pcv: {
					quantity:
						req.body.vaccine === "pcv"
							? subadminVaccines.vaccines.pcv.quantity - req.body.quantity
							: subadminVaccines.vaccines.pcv.quantity,
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

let requestVaccineStock = async (req, res, next) => {
	try {
		const data = {
			vaccine: req.body.vaccine,
			quantity: req.body.quantity,
			orgName: req.user.name,
			organization: req.user,
		};
		const newRequest = await new vaccineRequest(data).save();
		return res.json({
			message: "Vaccine tock request send successfully.",
			data: { newRequest },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccineRequests = async (req, res, next) => {
	try {
		return res.json({
			message: "Vaccine stock requests",
			data: await subadminVaccineRequest.find({ orgCity: req.user.address.city }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let userRequests = async (req, res, next) => {
	try {
		return res.json({
			message: "User signup requests",
			data: await userRequestsModel.find({}),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};
let approveRequest = async (req, res, next) => {
	try {
		const newRequest = await userRequestsModel.findOne({ _id: req.params.id });
		console.log("New Request data: ", newRequest);
		users.insertMany(newRequest).then(async (r) => {
			const orgVacc = {
				organization: newRequest._id,
				vaccines: {
					opv: { quantity: 0 },
					measles: { quantity: 0 },
					bcg: { quantity: 0 },
					pentavalent: { quantity: 0 },
					pcv: { quantity: 0 },
				},
			};
			const newVaccines = await new orgVaccines(orgVacc).save();
			await userRequestsModel.findOneAndDelete({ _id: req.params.id });
			return res.json({
				message: "User request accepted successfully!",
				data: { newRequest, newVaccines },
			});
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};
let rejectRequest = async (req, res, next) => {
	try {
		return res.json({
			message: "User signup requests",
			data: await userRequestsModel.findOneAndDelete({ _id: req.params.id }),
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
	requestVaccineStock,
	vaccineRequests,
	userRequests,
	approveRequest,
	rejectRequest,
};
