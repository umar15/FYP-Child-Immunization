const subadminController = require("./subadmin.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(
		version + "/subadmin",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.subadmin
	);
	app.get(
		version + "/subadmin/children",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.viewChildren
	);
	app.get(
		version + "/subadmin/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.viewChild
	);
	app.get(
		version + "/subadmin/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.viewVaccines
	);
	app.post(
		version + "/subadmin/vaccine/add",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.addVaccine
	);
	app.post(
		version + "/subadmin/vaccine/assign/:id",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.assignVaccine
	);
	app.delete(
		version + "/subadmin/vaccine/:id",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.deleteVaccine
	);
	app.put(
		version + "/subadmin/vaccine/:id",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.updateVaccine
	);
	app.get(
		version + "/subadmin/futurecases",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.futureCases
	);
	app.get(
		version + "/subadmin/futurevaccineneeds",
		passport.isAuthenticated,
		passport.isAuthorized("sub admin"),
		subadminController.futureVaccineNeeds
	);
};
