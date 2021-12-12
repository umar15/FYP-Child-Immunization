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
	childVaccinationSchedule = mongoose.model("childVaccinationSchedule"),
	dailyConsumption = mongoose.model("dailyConsumption"),
	reportsSchema = mongoose.model("reportsSchema"),
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
		let childrenData = await children.find({ "address.city": req.user.address.city });
		return res.json({
			message: "Children",
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
		let childrenData = await children.findOne({ _id: req.params.id });
		return res.json({
			message: "Child",
			data: childrenData,
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
			data: await users.find({ $and: [{ userType: "hospital" }, { "address.city": req.user.address.city }] }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};
let getHospital = async (req, res, next) => {
	try {
		return res.json({
			message: "Hospital",
			data: await users.find({ _id: req.params.id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let getVaccineCenters = async (req, res, next) => {
	try {
		return res.json({
			message: "Vaccine centers",
			data: await users.find({ $and: [{ userType: "vaccinecenter" }, { "address.city": req.user.address.city }] }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};
let getVaccineCenter = async (req, res, next) => {
	try {
		return res.json({
			message: "Vaccine center",
			data: await users.find({ _id: req.params.id }),
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

		let Vaccine = req.body.vaccine;
		const orgVacc = {
			organization: org,
			vaccines: {
				opv: {
					quantity:
						Vaccine === "opv"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.opv.quantity
							: organizationVacc.vaccines.opv.quantity,
				},
				measles: {
					quantity:
						Vaccine === "measles"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.measles.quantity
							: organizationVacc.vaccines.measles.quantity,
				},
				bcg: {
					quantity:
						Vaccine === "bcg"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.bcg.quantity
							: organizationVacc.vaccines.bcg.quantity,
				},
				pentavalent: {
					quantity:
						Vaccine === "pentavalent"
							? parseInt(req.body.quantity) + organizationVacc.vaccines.pentavalent.quantity
							: organizationVacc.vaccines.pentavalent.quantity,
				},
				pcv: {
					quantity:
						Vaccine === "pcv"
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

		const assignedVaccine = await new assignVaccineTo({
			vaccine: req.body.vaccine,
			date: req.body.date,
			quantity: req.body.quantity,
			organization: org,
			assignedBy: req.user,
		}).save();

		await orgVaccines.findOneAndUpdate({ _id: organizationVacc._id }, orgVacc, { new: true });
		await orgVaccines.findOneAndUpdate({ _id: subadminVaccines._id }, remainingVaccines, { new: true });

		return res.json({
			message: "vaccine assigned successfully.",
			data: {
				orgVaccineDetails: orgVacc,
				subadminRemainingVaccines: remainingVaccines,
				assignedVaccine,
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
			data: await userRequestsModel.find({ "address.city": req.user.address.city }),
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

let vaccinatedNonVaccinated = async (req, res, next) => {
	try {
		let childrenData;
		childrenData = await children.find({ "address.city": req.user.address.city });

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
		let childrenData = await children.find({ "address.city": req.user.address.city });

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

let vaccineRequirement = async (req, res, next) => {
	try {
		let orgDailyConsumption = await dailyConsumption.find({}).populate({
			path: "organization",
			match: {
				"address.city": req.user.address.city,
			},
		});
		let childrenData = await children.find({ "address.city": req.user.address.city });
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
				sevenDays:
					opvDaily === 0
						? Math.ceil(childrenData.length * 2 + (childrenData.length * 2 * 10) / 100)
						: Math.ceil(opvDaily * 7 + (opvDaily * 7 * 10) / 100),
				thirtyDays:
					opvDaily === 0
						? Math.ceil(childrenData.length * 4 + (childrenData.length * 4 * 20) / 100)
						: Math.ceil(opvDaily * 30 + (opvDaily * 30 * 10) / 100),
			},
			bcg: {
				sevenDays:
					bcgDaily === 0
						? Math.ceil(childrenData.length * 2 + (childrenData.length * 2 * 10) / 100)
						: Math.ceil(bcgDaily * 7 + (bcgDaily * 7 * 10) / 100),
				thirtyDays:
					bcgDaily === 0
						? Math.ceil(childrenData.length * 2 + (childrenData.length * 2 * 20) / 100)
						: Math.ceil(bcgDaily * 30 + (bcgDaily * 30 * 10) / 100),
			},
			pcv: {
				sevenDays:
					pcvDaily === 0
						? Math.ceil(childrenData.length * 1.5 + (childrenData.length * 1.5 * 10) / 100)
						: Math.ceil(pcvDaily * 7 + (pcvDaily * 7 * 10) / 100),
				thirtyDays:
					pcvDaily === 0
						? Math.ceil(childrenData.length * 3 + (childrenData.length * 1.5 * 30) / 100)
						: Math.ceil(pcvDaily * 30 + (pcvDaily * 30 * 10) / 100),
			},
			pentavalent: {
				sevenDays:
					pentavalentDaily === 0
						? Math.ceil(childrenData.length * 1.5 + (childrenData.length * 1.5 * 10) / 100)
						: Math.ceil(pentavalentDaily * 7 + (pentavalentDaily * 7 * 10) / 100),
				thirtyDays:
					pentavalentDaily === 0
						? Math.ceil(childrenData.length * 3 + (childrenData.length * 1.5 * 35) / 100)
						: Math.ceil(pentavalentDaily * 30 + (pentavalentDaily * 30 * 10) / 100),
			},
			measles: {
				sevenDays:
					measlesDaily === 0
						? Math.ceil(childrenData.length + (childrenData.length * 10) / 100)
						: Math.ceil(measlesDaily * 7 + (measlesDaily * 7 * 10) / 100),
				thirtyDays:
					measlesDaily === 0
						? Math.ceil(childrenData.length * 2 + (childrenData.length * 2 * 20) / 100)
						: Math.ceil(measlesDaily * 30 + (measlesDaily * 30 * 10) / 100),
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

let sendReport = async (req, res, next) => {
	console.log("Request.body: ", req.body);
	let report = {
		children: req.body,
		org: req.user,
	};
	try {
		return res.json({
			message: "Non vaccinated children report.",
			data: await new reportsSchema(report).save(),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let getChildReports = async (req, res, next) => {
	let reports = await reportsSchema.find().populate("org").populate("children");
	reports = reports.filter((item) => {
		return (
			item.org.address.city === req.user.address.city &&
			(item.org.userType === "hospital" || item.org.userType === "vaccinecenter")
		);
	});
	try {
		return res.json({
			message: "Child Reports Sub admin",
			data: reports,
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
	getHospital,
	getVaccineCenters,
	getVaccineCenter,
	futureCases,
	futureVaccineNeeds,
	assignVaccine,
	requestVaccineStock,
	vaccineRequests,
	userRequests,
	approveRequest,
	rejectRequest,
	vaccinatedNonVaccinated,
	childrenStats,
	childVaccineSchedule,
	vaccineRequirement,
	userVaccinesInfo,
	getChildReports,
	sendReport,
};
