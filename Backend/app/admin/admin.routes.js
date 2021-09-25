const adminController = require("./admin.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(version + "/admin", passport.isAuthenticated, passport.isAuthorized("admin"), adminController.admin);
	app.get(
		version + "/admin/children",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewChildren
	);
	app.get(
		version + "/admin/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewChild
	);
	app.get(
		version + "/admin/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewVaccines
	);
	app.post(
		version + "/admin/vaccines/add",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.addVaccine
	);
	app.delete(
		version + "/admin/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.deleteVaccine
	);
	app.put(
		version + "/admin/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.updateVaccine
	);
	app.get(
		version + "/admin/hospitals",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewHospitals
	);
	app.get(
		version + "/admin/vaccinecenters",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewVaccineCenters
	);
	app.get(
		version + "/admin/subadmins",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.viewSubAdmins
	);
	app.post(
		version + "/admin/subadmins/add",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.addSubAdmin
	);
	app.delete(
		version + "/admin/subadmins/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.deleteSubAdmin
	);
	app.put(
		version + "/admin/subadmins/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.updateSubAdmin
	);
	app.post(
		version + "/admin/subadmins/assignvaccine/:id",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.assignVaccine
	);
	app.get(
		version + "/admin/futurecases",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.futureCases
	);
	app.get(
		version + "/admin/futurevaccineneeds",
		passport.isAuthenticated,
		passport.isAuthorized("admin"),
		adminController.futureVaccineNeeds
	);
};
