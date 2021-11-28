const { overArgs } = require("lodash");

const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	vaccine = mongoose.model("Vaccine"),
	users = mongoose.model("userAccounts"),
	assignVaccineTo = mongoose.model("assignVaccineTo"),
	orgVaccines = mongoose.model("organizationVaccines"),
	vaccineRequest = mongoose.model("vaccineRequest"),
	childVaccinationSchedule = mongoose.model("childVaccinationSchedule"),
	dailyConsumption = mongoose.model("dailyConsumption"),
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
		let childrenData;
		// console.log("Req id: ", req.params.id);
		if (req.params.id === "Country") {
			childrenData = await children.find({});
		} else {
			childrenData = await children.find({ "address.city": req.params.id });
		}
		return res.json({
			message: "Children data",
			data: {
				children: childrenData,
				numberOfChildren: childrenData.length,
			},
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
let getHospital = async (req, res, next) => {
	try {
		return res.json({
			message: "hospital",
			data: await users.find({ _id: req.params.id }),
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
			data: await users.find({ userType: "vaccinecenter" }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};
let getVaccineCenter = async (req, res, next) => {
	try {
		return res.json({
			message: "vaccine center",
			data: await users.find({ _id: req.params.id }),
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
			data: await users.find({ userType: "subadmin" }),
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

let userVaccinesInfo = async (req, res, next) => {
	try {
		const orgVacc = await orgVaccines.find({ organization: req.params.id });
		return res.json({
			message: "Organization vaccines.",
			data: {
				uservaccines: orgVacc,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let getUserAssignedVaccines = async (req, res, next) => {
	try {
		const assignedvaccines = await assignVaccineTo
			.find({ assignedBy: req.params.id })
			.populate("organization")
			.populate("assignedBy");
		return res.json({
			message: "Organization assigned vaccines.",
			data: {
				assignedvaccines,
			},
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
				assignedBy: req.user,
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

let vaccineRequirement = async (req, res, next) => {
	try {
		let orgDailyConsumption;
		if (req.params.id === "Country") {
			orgDailyConsumption = await dailyConsumption.find({});
		} else {
			orgDailyConsumption = await dailyConsumption.find({}).populate({
				path: "organization",
				match: {
					"address.city": req.params.id,
				},
			});
		}
		// console.log("Daily: ", orgDailyConsumption);

		let pcv = [];
		let bcg = [];
		let pentavalent = [];
		let opv = [];
		let measles = [];
		let pcvDaily = 0;
		let bcgDaily = 0;
		let pentavalentDaily = 0;
		let opvDaily = 0;
		let measlesDaily = 0;
		orgDailyConsumption.map((item) => {
			if (item.vaccineName === "pcv") {
				pcv.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					pcvDaily += 1;
				}
			} else if (item.vaccineName === "bcg") {
				bcg.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					bcgDaily += 1;
				}
			} else if (item.vaccineName === "opv") {
				opv.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					opvDaily += 1;
				}
			} else if (item.vaccineName === "pentavalent") {
				pentavalent.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					pentavalentDaily += 1;
				}
			} else if (item.vaccineName === "measles") {
				measles.push(item);
				let date = new Date(item.date);
				let today = new Date();
				if (date.toDateString() == today.toDateString()) {
					measlesDaily += 1;
				}
			}
		});

		let requirements = {
			opv: {
				sevenDays: Math.ceil(opvDaily * 7 + (opvDaily * 7 * 10) / 100),
				thirtyDays: Math.ceil(opvDaily * 30 + (opvDaily * 30 * 10) / 100),
			},
			bcg: {
				sevenDays: Math.ceil(bcgDaily * 7 + (bcgDaily * 7 * 10) / 100),
				thirtyDays: Math.ceil(bcgDaily * 30 + (bcgDaily * 30 * 10) / 100),
			},
			pcv: {
				sevenDays: Math.ceil(pcvDaily * 7 + (pcvDaily * 7 * 10) / 100),
				thirtyDays: Math.ceil(pcvDaily * 30 + (pcvDaily * 30 * 10) / 100),
			},
			pentavalent: {
				sevenDays: Math.ceil(pentavalentDaily * 7 + (pentavalentDaily * 7 * 10) / 100),
				thirtyDays: Math.ceil(pentavalentDaily * 30 + (pentavalentDaily * 30 * 10) / 100),
			},
			measles: {
				sevenDays: Math.ceil(measlesDaily * 7 + (measlesDaily * 7 * 10) / 100),
				thirtyDays: Math.ceil(measlesDaily * 30 + (measlesDaily * 30 * 10) / 100),
			},
		};

		return res.json({
			message: "Vaccine requirements",
			data: {
				requirements,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccinatedNonVaccinated = async (req, res, next) => {
	try {
		let childrenData;
		if (req.params.id === "Country") {
			childrenData = await children.find({});
		} else {
			childrenData = await children.find({ "address.city": req.params.id });
		}
		let vaccinated = 0;
		let nonVaccinated = 0;
		childrenData.map((item) => {
			if (
				item.vaccination[0].opv.noOfDoses === 4 &&
				item.vaccination[0].measles.noOfDoses === 2 &&
				item.vaccination[0].bcg.noOfDoses === 1 &&
				item.vaccination[0].pentavalent.noOfDoses === 3 &&
				item.vaccination[0].pcv.noOfDoses === 3
			) {
				vaccinated += 1;
			} else {
				nonVaccinated += 1;
			}
		});

		return res.json({
			message: "Vaccinated non vaccinated stats",
			data: {
				vaccinated,
				nonVaccinated,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let childrenStats = async (req, res, next) => {
	try {
		let childrenData;
		if (req.params.id === "Country") {
			childrenData = await children.find({});
		} else {
			childrenData = await children.find({ "address.city": req.params.id });
		}

		let bornToday = 0;
		let bornSevenDays = 0;
		let bornOneMonth = 0;
		let today = new Date();
		let sevenDaysInMs = 86400000 * 7;
		let thirtyDaysInMs = 86400000 * 30;
		childrenData.length > 0 &&
			childrenData.map((item) => {
				// console.log("child: ", item.address.city);
				let d = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
				let dob = new Date(item.dateOfBirth);
				let b = dob.getFullYear() + "-" + (dob.getMonth() + 1) + "-" + dob.getDate();
				if (b === d) {
					bornToday += 1;
				}
				dob.setHours(0, 0, 0, 0);
				today.setHours(0, 0, 0, 0);
				if (today - dob < sevenDaysInMs) {
					bornSevenDays += 1;
				}
				if (today - dob < thirtyDaysInMs) {
					bornOneMonth += 1;
				}
			});

		return res.json({
			message: "Child Stats",
			data: {
				bornToday,
				bornSevenDays,
				bornOneMonth,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let childVaccineSchedule = async (req, res, next) => {
	try {
		return res.json({
			message: "Child Vaccination Schedule",
			data: await childVaccinationSchedule.find({ child: req.params.id }),
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
	getHospital,
	viewVaccineCenters,
	getVaccineCenter,
	viewSubAdmins,
	addSubAdmin,
	deleteSubAdmin,
	updateSubAdmin,
	futureCases,
	futureVaccineNeeds,
	assignVaccine,
	vaccineStockRequests,
	vaccineRequirement,
	childrenStats,
	vaccinatedNonVaccinated,
	userVaccinesInfo,
	getUserAssignedVaccines,
	childVaccineSchedule,
};
