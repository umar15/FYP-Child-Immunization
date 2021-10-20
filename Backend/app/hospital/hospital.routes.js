const hospitalController = require("./hospital.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.post(
		version + "/hospital/children/add",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.addChild
	);
	app.get(
		version + "/hospital",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.hospital
	);
	app.get(
		version + "/hospital/children",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.viewChildren
	);
	app.get(
		version + "/hospital/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.viewChild
	);
	app.put(
		version + "/hospital/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.updateChild
	);
	app.get(
		version + "/hospital/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.viewVaccines
	);
	app.post(
		version + "/hospital/vaccines/add",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.addVaccine
	);
	app.delete(
		version + "/hospital/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.deleteVaccine
	);
	app.put(
		version + "/hospital/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.updateVaccine
	);
	app.get(
		version + "/hospital/requestvaccines",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.requestVaccines
	);
	app.get(
		version + "/hospital/reminders/:id",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.reminders
	);
	app.get(
		version + "/hospital/vaccinerequirement",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.vaccineRequirement
	);
	app.get(
		version + "/hospital/certificates",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.certificates
	);
	app.post(
		version + "/hospital/requestvaccinestock",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.requestVaccineStock
	);
	app.get(
		version + "/hospital/vaccinatednonvaccinated",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.vaccinatedNonVaccinated
	);
	app.get(
		version + "/hospital/childbornstats",
		passport.isAuthenticated,
		passport.isAuthorized("hospital"),
		hospitalController.childBornStats
	);
};
