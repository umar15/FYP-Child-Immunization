const winston = require("../../config/winston"),
	mongoose = require("mongoose"),
	users = mongoose.model("userAccounts"),
	children = mongoose.model("Children"),
	hospitalVaccines = mongoose.model("organizationVaccines"),
	stockRequest = mongoose.model("subadminVaccineRequest"),
	dailyConsumption = mongoose.model("dailyConsumption"),
	childVaccinationSchedule = mongoose.model("childVaccinationSchedule");

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

let viewHospital = async (req, res, next) => {
	try {
		return res.json({
			message: "View Hospital",
			data: await users.findOne({ _id: req.params.id }),
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
		const dob = new Date(req.body.dateOfBirth);
		console.log("dob: ", dob);
		console.log("dob: ", new Date());
		const birth = new Date(dob.setDate(dob.getDate())).toDateString();
		const sixWeeks = new Date(dob.setDate(dob.getDate() + 2)).toDateString();
		const tenWeeks = new Date(dob.setDate(dob.getDate() + 28)).toDateString();
		const forteenWeeks = new Date(dob.setDate(dob.getDate() + 28)).toDateString();
		const nineMonths = new Date(dob.setDate(dob.getDate() + 172)).toDateString();
		const fifteenMonths = new Date(dob.setDate(dob.getDate() + 180)).toDateString();
		console.log("dob new: ", birth);
		console.log("dob new: ", sixWeeks);
		console.log("dob new: ", tenWeeks);
		console.log("dob new: ", forteenWeeks);
		console.log("dob new: ", nineMonths);
		console.log("dob new: ", fifteenMonths);

		const schedule = {
			child: newChild._id,
			vaccines: {
				opv0: {
					date: birth,
					done: true,
				}, // polio
				opv1: {
					date: sixWeeks,
					done: false,
				},
				opv2: {
					date: tenWeeks,
					done: false,
				},
				opv3: {
					date: forteenWeeks,
					done: false,
				},
				measles0: {
					date: nineMonths,
					done: false,
				},
				measles1: {
					date: fifteenMonths,
					done: false,
				},
				bcg: {
					date: birth,
					done: true,
				}, // children TB
				pentavalent0: {
					date: sixWeeks,
					done: false,
				},
				pentavalent1: {
					date: tenWeeks,
					done: false,
				},
				pentavalent2: {
					date: forteenWeeks,
					done: false,
				},
				pcv0: {
					date: sixWeeks,
					done: false,
				},
				pcv1: {
					date: tenWeeks,
					done: false,
				},
				pcv2: {
					date: forteenWeeks,
					done: false,
				},
			},
		};
		const vcSchedule = await new childVaccinationSchedule(schedule).save();
		console.log("Schedule: ", schedule);
		res.json({
			message: "Child added sussessfully.",
			data: {
				child: newChild,
				vaccineSchedule: vcSchedule,
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
		const child = await children.findOne({ _id: req.params.id });
		const newChild = await children.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		const orgVacc = await hospitalVaccines.findOne({ organization: req.user._id });
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
			await hospitalVaccines.findByIdAndUpdate(
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
			await hospitalVaccines.findByIdAndUpdate(
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
			await hospitalVaccines.findByIdAndUpdate(
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
			await hospitalVaccines.findByIdAndUpdate(
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
			await hospitalVaccines.findByIdAndUpdate(
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
let checkDailyConsumption = async (req, res, next) => {
	try {
		return res.json({
			message: "Daily consumption",
			data: await dailyConsumption.find({ organization: req.user._id }),
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
		// console.log("VAccine", item.vaccination);
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

const reports = async (req, res, next) => {
	try {
		const childrenData = await children.find({ hospitalName: req.user._id });
		let childrenVaccines = await childVaccinationSchedule.find({});
		let nonVaccinatedChildren = [];
		const today = new Date();
		let sevenDaysInMs = 86400000 * 7;
		let threeDaysInMs = 86400000 * 3;
		let thirtyDaysInMs = 86400000 * 30;

		childrenVaccines.map((item, index) => {
			console.log("Iteration: ", index + 1);
			today.setHours(0, 0, 0, 0);
			let d1 = new Date(item.vaccines.opv1.date);
			console.log(d1);
			let d1Done = item.vaccines.opv1.done;
			console.log(d1Done);
			let d2 = new Date(item.vaccines.opv2.date);
			console.log(d2);
			let d2Done = item.vaccines.opv2.done;
			console.log(d2Done);
			let d3 = new Date(item.vaccines.opv3.date);
			console.log(d3);
			let d3Done = item.vaccines.opv3.done;
			console.log(d3Done);
			let d4 = new Date(item.vaccines.measles0.date);
			console.log(d4);
			let d4Done = item.vaccines.measles0.done;
			console.log(d4Done);
			let d5 = new Date(item.vaccines.measles1.date);
			console.log(d5);
			let d5Done = item.vaccines.measles1.done;
			console.log(d5Done);

			if (d1.setHours(0, 0, 0, 0) + threeDaysInMs < today && d1Done === false) {
				console.log("If d1");
				nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
			}
			if (d2.setHours(0, 0, 0, 0) + threeDaysInMs < today && d2Done === false) {
				nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
			}
			if (d3.setHours(0, 0, 0, 0) + threeDaysInMs < today && d3Done === false) {
				nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
			}
			if (d4.setHours(0, 0, 0, 0) + threeDaysInMs < today && d4Done === false) {
				nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
			}
			if (d5.setHours(0, 0, 0, 0) + threeDaysInMs < today && d5Done === false) {
				nonVaccinatedChildren = [...nonVaccinatedChildren, item.child];
			}
		});
		// console.log(nonVaccinatedChildren);
		return res.json({
			message: "Non Vaccinated Children Reports",
			data: {
				nonVaccinatedChildren,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

module.exports = {
	hospital,
	viewHospital,
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
	checkDailyConsumption,
	reports,
};
