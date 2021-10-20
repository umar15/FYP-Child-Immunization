const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	hospitalVaccines = mongoose.model("organizationVaccines"),
	stockRequest = mongoose.model("subadminVaccineRequest");

let hospital = (req, res, next) => {
	try {
		return res.json({
			message: "Hospital",
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
			message: "View CHildren",
			data: await children.find({ hospitalName: req.user._id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let viewChild = async (req, res, next) => {
	try {
		return res.json({
			message: "View Child",
			data: await children.findOne({ _id: req.params.id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let addChild = async (req, res, next) => {
	try {
		const newChild = await new children(req.body).save();
		res.json({
			message: "Child added sussessfully.",
			data: {
				child: newChild,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let reminders = async (req, res, next) => {
	const data = await children.find({ _id: req.params.id });
	// console.log("Data", data);
	const mobileNumber = data[0].contactNo;
	// console.log("Mobile Number: ", mobileNumber);
	try {
		res.json({
			msg: "Message has been sent to parent's mobile number for vaccination reminder.",
			data: {
				mobileNumber,
			},
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
			data: await hospitalVaccines.find({ organization: req.user._id }),
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

let requestVaccines = (req, res, next) => {
	try {
		return res.json({
			message: "request vaccines",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccineRequirement = (req, res, next) => {
	try {
		return res.json({
			message: "update sub admin",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let certificates = (req, res, next) => {
	try {
		return res.json({
			message: "delete subadmin",
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
			orgCity: req.user.address.city,
			organization: req.user,
		};
		const newRequest = await new stockRequest(data).save();

		return res.json({
			message: "Vaccine stock request sent successfully.",
			data: { newRequest },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccinatedNonVaccinated = async (req, res, next) => {
	const childrenData = await children.find({ hospitalName: req.user._id });
	let vaccinated = 0;
	let nonVaccinated = 0;
	childrenData.map((item) => {
		console.log("VAccine", item.vaccination);
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
	try {
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

let childBornStats = async (req, res, next) => {
	const childrenData = await children.find({ hospitalName: req.user._id });
	let bornToday = 0;
	let bornSevenDays = 0;
	let bornOneMonth = 0;
	let today = new Date();
	let sevenDaysInMs = 86400000 * 7;
	let thirtyDaysInMs = 86400000 * 30;
	childrenData.map((item) => {
		let d = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
		let dob = new Date(item.dateOfBirth);
		let b = dob.getFullYear() + "-" + (dob.getMonth() + 1) + "-" + dob.getDate();
		console.log("diff: ", today - dob);
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

	console.log("Satts", bornToday);

	try {
		return res.json({
			message: "Child daily stats",
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

module.exports = {
	hospital,
	viewChildren,
	viewChild,
	addChild,
	updateChild,
	viewVaccines,
	addVaccine,
	updateVaccine,
	deleteVaccine,
	requestVaccines,
	reminders,
	vaccineRequirement,
	certificates,
	requestVaccineStock,
	vaccinatedNonVaccinated,
	childBornStats,
};
