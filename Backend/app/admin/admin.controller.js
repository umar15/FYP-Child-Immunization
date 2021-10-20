const { overArgs } = require("lodash");

const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	vaccine = mongoose.model("Vaccine"),
	users = mongoose.model("userAccounts"),
	assignVaccineTo = mongoose.model("assignVaccineTo"),
	orgVaccines = mongoose.model("organizationVaccines"),
	vaccineRequest = mongoose.model("vaccineRequest"),
	nodemailer = require("nodemailer");

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
		const orgVacc = {
			organization: newUser._id,
			vaccines: {
				opv: { quantity: 0 }, // polio
				measles: { quantity: 0 },
				bcg: { quantity: 0 }, // children TB
				pentavalent: { quantity: 0 },
				pcv: { quantity: 0 },
			},
		};
		const newVaccines = await new orgVaccines(orgVacc).save();

		// Mail to user
		var options = {
			service: "SendGrid",
			auth: {
				user: "apikey",
				pass: process.env.SENDGRID_KEY,
			},
		};
		var transporter = nodemailer.createTransport(options);

		var mailOptions = {
			from: "sp18-bcs-164@student.comsats.edu.pk",
			to: req.body.email,
			subject: "CVS Signup successfull.",
			text:
				"Congratulations! \n\n" +
				"Your have been added as a subadmin in Child Vaccination System. \n" +
				"Below are the login credentials of your account. Do not give these credentials to someone else. \n" +
				"EMAIL: " +
				req.body.email +
				"\n" +
				"PASSWORD: " +
				req.body.password +
				"\n" +
				"Login to your account by entering the above credentials/. \n\n" +
				"Thanks!",
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email has been sent to: " + info.response);
			}
		});

		return res.json({
			message: "Subadmin added successfully.",
			data: {
				subadmin: newUser,
				vaccines: newVaccines,
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
		const user = await users.findByIdAndDelete({ _id: req.params.id });
		const org = await orgVaccines.findOne({ organization: user._id });
		await orgVaccines.findByIdAndDelete({ _id: org._id });
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
		console.log("Organization: ", org);
		if (!org) {
			throw "No organization found with that name.";
		}

		const Vaccine = await vaccine.findOne({ name: req.body.vaccine });
		if (!Vaccine) {
			throw "No vaccine available with this name.";
		}
		console.log("Vaccine: ", Vaccine);

		const organizationVacc = await orgVaccines.findOne({ organization: org._id });
		console.log("Organization vaccines: ", organizationVacc);

		console.log("type of quantity: ", typeof req.body.quantity);

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
		console.log("Org vacc: ", orgVacc);

		if (Vaccine.quantity > 0) {
			const assignedVaccine = await new assignVaccineTo({
				vaccine: req.body.vaccine,
				date: req.body.date,
				quantity: req.body.quantity,
				organization: org,
			}).save();

			const remainingVaccine = Vaccine.quantity - req.body.quantity;
			await vaccine.findOneAndUpdate(
				{ name: req.body.vaccine },
				{ $set: { quantity: remainingVaccine } },
				{ new: true }
			);

			await orgVaccines.findOneAndUpdate({ _id: organizationVacc._id }, orgVacc, { new: true });

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

let vaccineStockRequests = async (req, res, next) => {
	try {
		return res.json({
			message: "Vaccine stock requests",
			data: await vaccineRequest.find({}),
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
	vaccineStockRequests,
};
