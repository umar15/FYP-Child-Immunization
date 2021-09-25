const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	vaccine = mongoose.model("Vaccine"),
	users = mongoose.model("userAccounts"),
	assignVaccineTo = mongoose.model("assignVaccineTo"),
	orgVaccines = mongoose.model("organizationVaccines");

let admin = (req, res, next) => {
	try {
		return res.json({
			message: "Admin dashboard",
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
			message: "Children data",
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
			message: "Child data",
			data: await children.findOne({ _id: req.params.id }),
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
			data: await vaccine.find({}),
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

let viewHospitals = async (req, res, next) => {
	try {
		return res.json({
			message: "hospitals",
			data: await users.find({ userType: "hospital" }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewVaccineCenters = async (req, res, next) => {
	try {
		return res.json({
			message: "vaccine centers",
			data: await users.find({ userType: "vaccine center" }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewSubAdmins = async (req, res, next) => {
	try {
		return res.json({
			message: "sub admins",
			data: await users.find({ userType: "sub admin" }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addSubAdmin = async (req, res, next) => {
	try {
		const newUser = await new users(req.body).save();
		return res.json({
			message: "Sub admin added successfully.",
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateSubAdmin = async (req, res, next) => {
	try {
		const newSubAdmin = await users.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		return res.json({
			message: "Sub admin updated successfully.",
			data: {
				subAdmin: newSubAdmin,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteSubAdmin = async (req, res, next) => {
	try {
		await users.findByIdAndDelete({ _id: req.params.id });
		return res.json({
			message: "sub admin deleted successfully.",
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

		const Vaccine = await vaccine.find({ _id: req.body.vaccine });
		if (!Vaccine) {
			throw "No vaccine available with this name.";
		}

		console.log(Vaccine);

		const orgVacc = {
			organization: org,
			vaccines: [
				{
					polio: { remainingQuantity: Vaccine[0].name === "polio" ? req.body.quantity : 0 },
					diphtheria: { remainingQuantity: Vaccine[0].name === "diphteria" ? req.body.quantity : 0 },
					homophiles: { remainingQuantity: Vaccine[0].name === "homophiles" ? req.body.quantity : 0 },
					rotaVirus: { remainingQuantity: Vaccine[0].name === "rotaVirus" ? req.body.quantity : 0 },
					measles: { remainingQuantity: Vaccine[0].name === "measles" ? req.body.quantity : 0 },
					hepatitisA: { remainingQuantity: Vaccine[0].name === "hepatitusA" ? req.body.quantity : 0 },
					hepatitisB: { remainingQuantity: Vaccine[0].name === "hepatitusB" ? req.body.quantity : 0 },
					papillomaVirus: { remainingQuantity: Vaccine[0].name === "papillomaVirus" ? req.body.quantity : 0 },
					influenza: { remainingQuantity: Vaccine[0].name === "Influenza" ? req.body.quantity : 0 },
				},
			],
		};

		if (Vaccine[0].quantity > 0) {
			const assignedVaccine = await new assignVaccineTo({
				vaccine: req.body.vaccine,
				date: req.body.date,
				quantity: req.body.quantity,
				organization: org,
			}).save();

			const remainingVaccine = Vaccine[0].quantity - req.body.quantity;
			await vaccine.findOneAndUpdate(
				{ _id: req.body.vaccine },
				{ $set: { quantity: remainingVaccine } },
				{ new: true }
			);

			await new orgVaccines(orgVacc).save();

			return res.json({
				message: "vaccine assigned successfully.",
				data: {
					assignedVaccine,
					orgVaccineDetails: orgVacc,
				},
			});
		} else {
			return res.json({
				message: "The vaccine is not available currently.",
				data: {},
			});
		}
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
	admin,
	viewChildren,
	viewChild,
	viewVaccines,
	addVaccine,
	updateVaccine,
	deleteVaccine,
	viewHospitals,
	viewVaccineCenters,
	viewSubAdmins,
	addSubAdmin,
	deleteSubAdmin,
	updateSubAdmin,
	futureCases,
	futureVaccineNeeds,
	assignVaccine,
};
