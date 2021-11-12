const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	children = mongoose.model("Children"),
	childVaccinationSchedule = mongoose.model("childVaccinationSchedule"),
	dailyConsumption = mongoose.model("dailyConsumption"),
	workerVaccines = mongoose.model("organizationVaccines"),
	otpGenerator = require("otp-generator"),
	Twilio = require("twilio");

let polioWorker = (req, res, next) => {
	try {
		return res.json({
			message: "Polio worker",
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
			data: await children.find({}),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateChild = async (req, res, next) => {
	try {
		const child = await children.findOne({ _id: req.params.id });
		const newChild = await children.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		const orgVacc = await workerVaccines.findOne({ organization: req.user._id });
		var vaccineSchedule = await childVaccinationSchedule.findOne({ child: req.params.id });
		const childVaccSchedule = await childVaccinationSchedule.findOne({ child: req.params.id });
		console.log("Vaccineschedule: ", vaccineSchedule);

		if (child.vaccination[0].opv.noOfDoses !== newChild.vaccination[0].opv.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "opv",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				opv: {
					quantity: orgVacc.vaccines.opv.quantity - 1,
				},
			};
			await workerVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			let num = newChild.vaccination[0].opv.noOfDoses - 1;
			if (num === 0) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						opv0: {
							date: vaccineSchedule.vaccines.opv0.date,
							done: true,
						},
					},
				};
			} else if (num === 1) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						opv1: {
							date: vaccineSchedule.vaccines.opv1.date,
							done: true,
						},
					},
				};
			} else if (num === 2) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						opv2: {
							date: vaccineSchedule.vaccines.opv2.date,
							done: true,
						},
					},
				};
			} else {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						opv3: {
							done: true,
							date: vaccineSchedule.vaccines.opv3.date,
						},
					},
				};
			}
		}
		if (child.vaccination[0].measles.noOfDoses !== newChild.vaccination[0].measles.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "measles",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				measles: {
					quantity: orgVacc.vaccines.measles.quantity - 1,
				},
			};
			await workerVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			let num = newChild.vaccination[0].measles.noOfDoses - 1;
			if (num === 0) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						measles0: {
							date: vaccineSchedule.vaccines.measles0.date,
							done: true,
						},
					},
				};
			} else {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						measles1: {
							date: vaccineSchedule.vaccines.measles1.date,
							done: true,
						},
					},
				};
			}
		}
		if (child.vaccination[0].bcg.noOfDoses !== newChild.vaccination[0].bcg.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "bcg",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				bcg: {
					quantity: orgVacc.vaccines.bcg.quantity - 1,
				},
			};
			await workerVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			vaccineSchedule = {
				child: req.params.id,
				vaccines: {
					...vaccineSchedule.vaccines,
					bcg: {
						date: vaccineSchedule.vaccines.pcg.date,
						done: true,
					},
				},
			};
		}
		if (child.vaccination[0].pentavalent.noOfDoses !== newChild.vaccination[0].pentavalent.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "pentavalent",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				pentavalent: {
					quantity: orgVacc.vaccines.pentavalent.quantity - 1,
				},
			};
			await workerVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			let num = newChild.vaccination[0].pentavalent.noOfDoses - 1;
			if (num === 0) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pentavalent0: {
							date: vaccineSchedule.vaccines.pentavalent0.date,
							done: true,
						},
					},
				};
			} else if (num === 1) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pentavalent1: {
							date: vaccineSchedule.vaccines.pentavalent1.date,
							done: true,
						},
					},
				};
			} else {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pentavalent2: {
							date: vaccineSchedule.vaccines.pentavalent2.date,
							done: true,
						},
					},
				};
			}
		}
		if (child.vaccination[0].pcv.noOfDoses !== newChild.vaccination[0].pcv.noOfDoses) {
			await new dailyConsumption({
				vaccineName: "pcv",
				child: req.params.id,
				date: new Date(),
				organization: req.user._id,
			}).save();
			const remainingQuantity = {
				...orgVacc.vaccines,
				pcv: {
					quantity: orgVacc.vaccines.pcv.quantity - 1,
				},
			};
			await workerVaccines.findByIdAndUpdate(
				{ _id: orgVacc._id },
				{ $set: { vaccines: remainingQuantity } },
				{ new: true }
			);
			let num = newChild.vaccination[0].pcv.noOfDoses - 1;
			if (num === 0) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pcv0: {
							date: vaccineSchedule.vaccines.pcv0.date,
							done: true,
						},
					},
				};
			} else if (num === 1) {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pcv1: {
							date: vaccineSchedule.vaccines.pcv1.date,
							done: true,
						},
					},
				};
			} else {
				vaccineSchedule = {
					child: req.params.id,
					vaccines: {
						...vaccineSchedule.vaccines,
						pcv2: {
							date: vaccineSchedule.vaccines.pcv2.date,
							done: true,
						},
					},
				};
			}
		}
		// console.log("Org Vaccines: ", await hospitalVaccines.findOne({ organization: req.user._id }));
		// console.log("Schedule: ", vaccineSchedule);
		await childVaccinationSchedule.findByIdAndUpdate({ _id: childVaccSchedule._id }, vaccineSchedule, { new: true });
		// console.log(
		// 	await childVaccinationSchedule.findOne({
		// 		child: req.params.id,
		// 	})
		// );
		return res.json({
			message: "Child updated successfully.",
			data: {
				child: newChild,
				vaccineSchedule,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccinesInfo = (req, res, next) => {
	try {
		return res.json({
			message: "vaccines info.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let polioSymptoms = (req, res, next) => {
	try {
		return res.json({
			message: "polio symptoms",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let childGrowth = (req, res, next) => {
	try {
		return res.json({
			message: "child growth.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let vaccinationSchedule = async (req, res, next) => {
	try {
		return res.json({
			message: "vaccines info.",
			data: await childVaccinationSchedule.findOne({ child: req.params.id }),
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};
let oneTimePassword = async (req, res, next) => {
	try {
		let oneTimePass = otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false });
		let child = await children.findOne({ _id: req.params.id });
		let contacts = [child.contactNo, child.emergencyContact];
		console.log("Contacts: ", contacts);
		// const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
		// contacts.forEach(function (contact) {
		// 	const options = {
		// 		to: `${contact}`,
		// 		from: process.env.TWILIO_PHONE_NUMBER,
		// 		body: `OTP for child vaccination is ${oneTimePass}`,
		// 	};
		// 	// Send the message!
		// 	client.messages.create(options, function (err, response) {
		// 		if (err) {
		// 			console.error(err);
		// 		} else {
		// 			let masked = contact.substr(0, contact.length - 5);
		// 			masked += "*****";
		// 			winston.info(`Message sent to ${masked}`);
		// 		}
		// 	});
		// });
		return res.json({
			message: "OTP",
			data: { otp: oneTimePass },
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

module.exports = {
	polioWorker,
	updateChild,
	childGrowth,
	polioSymptoms,
	vaccinesInfo,
	viewChildren,
	vaccinationSchedule,
	oneTimePassword,
};
