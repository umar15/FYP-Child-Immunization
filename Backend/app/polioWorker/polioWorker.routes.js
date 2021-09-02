const polioWorkerController = require("./controllers/polioWorker.controller");
const passport = require("../../config/passport");

module.exports = (app, version) => {
	app.get(
		version + "/polioworker",
		passport.isAuthenticated,
		passport.isAuthorized("polio worker"),
		polioWorkerController.polioWorker
	);
	app.put(
		version + "/polioworker/children/:id",
		passport.isAuthenticated,
		passport.isAuthorized("polio worker"),
		polioWorkerController.updateChild
	);
	app.get(
		version + "/polioworker/vaccines",
		passport.isAuthenticated,
		passport.isAuthorized("polio worker"),
		polioWorkerController.vaccinesInfo
	);
	app.get(
		version + "/polioworker/reminders",
		passport.isAuthenticated,
		passport.isAuthorized("polio worker"),
		polioWorkerController.polioSymptoms
	);
	app.get(
		version + "/polioworker/childgrowth",
		passport.isAuthenticated,
		passport.isAuthorized("polio worker"),
		polioWorkerController.childGrowth
	);
};
