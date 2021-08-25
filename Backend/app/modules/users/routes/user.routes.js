const userController = require("../controllers/user.controller");
const passport = require("../../../../config/passport");

module.exports = (app, version) => {
	app.delete(version + "/users/logout", passport.isAuthenticated, userController.logout);
	app.get(version + "/users", userController.getUsers);
	app.put(version + "/users/:id", passport.isAuthenticated, userController.updateUser);
	app.delete(version + "/users/:id", passport.isAuthenticated, userController.deleteUser);
	app.post(version + "/users/create", userController.createUser);
	app.post(version + "/users/login", userController.logInUser, userController.sendSignInSuccess);
	app.get(version + "/users/current", passport.isAuthenticated, userController.sendCurrentUser);
};
