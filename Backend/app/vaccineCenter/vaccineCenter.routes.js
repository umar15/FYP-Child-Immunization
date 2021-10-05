const vaccineCenterController = require("./vaccineCenter.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(
		version + "/vaccinecenter",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.vaccineCenter
	);
	app.get(
		version + "/vaccinecenter/children",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.viewChildren
	);
	app.get(
		version + "/vaccinecenter/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.viewChild
	);
	app.put(
		version + "/vaccinecenter/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.updateChild
	);
	app.get(
		version + "/vaccinecenter/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.viewVaccines
	);
	app.post(
		version + "/vaccinecenter/vaccines/add",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.addVaccine
	);
	app.delete(
		version + "/vaccinecenter/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.deleteVaccine
	);
	app.put(
		version + "/vaccinecenter/vaccines/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.updateVaccine
	);
	app.get(
		version + "/vaccinecenter/campaigns",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.viewCampaigns
	);
	app.post(
		version + "/vaccinecenter/campaigns/add",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.addCampaigns
	);
	app.delete(
		version + "/vaccinecenter/campaigns/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.deleteCampaigns
	);
	app.put(
		version + "/vaccinecenter/campaigns/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.updateCampaigns
	);
	app.get(
		version + "/vaccinecenter/futurecases",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.futureCases
	);
	app.get(
		version + "/vaccinecenter/futurevaccineneeds",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.futureCases
	);
	app.get(
		version + "/vaccinecenter/notify",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.notifyPublic
	);

	app.get(
		version + "/vaccinecenter/workers",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.viewWorkers
	);
	app.post(
		version + "/vaccinecenter/workers/add",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.addWorker
	);
	app.delete(
		version + "/vaccinecenter/workers/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.deleteWorker
	);
	app.put(
		version + "/vaccinecenter/workers/:id",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.updateWorker
	);
	app.post(
		version + "/vaccinecenter/requestvaccinestock",
		passport.isAuthenticated,
		passport.isAuthorized("vaccine center"),
		vaccineCenterController.requestVaccineStock
	);
};
