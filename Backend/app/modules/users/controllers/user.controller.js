const winston = require("../../../../config/winston"),
	passport = require("../../../../config/passport"),
	mongoose = require("mongoose"),
	userAccountModel = mongoose.model("userAccounts");

let getUsers = async (req, res, next) => {
	try {
		filters = {};
		let users = await userAccountModel.find(filters);
		let noOfUsers = await userAccountModel.countDocuments(filters);

		return res.json({
			message: "Users fetched successfully.",
			data: {
				users,
				noOfUsers,
			},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let getUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		filters = { _id: id };
		let user = await userAccountModel.findOne(filters);

		if (user) {
			return res.json({
				message: "User fetched successfully.",
				data: {
					user,
				},
			});
		} else {
			return res.json({
				message: "User not found!",
				data: {},
			});
		}
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;

		await userAccountModel.updateOne({ _id: id }, { $set: req.body });

		return res.json({
			message: "User updated successfully.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;

		await userAccountModel.deleteOne({ _id: id });

		return res.json({
			message: "User deleted successfully.",
			data: {},
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let createUser = async (req, res, next) => {
	try {
		new userAccountModel(req.body).save((err) => {
			if (err) {
				return res.redirect("/error");
			} else {
				return res.json({
					message: "User created successfully.",
					data: {},
				});
			}
		});
	} catch (err) {
		winston.error(err);
		res.redirect("/error");
	}
};

let logInUser = (req, res, next) => {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return next(info);
		}

		req.logIn(user, function (err) {
			if (err) {
				winston.error(err);
				return next({ msgCode: 114 });
			}
			return next();
		});
	})(req, res, next);
};

let sendSignInSuccess = async (req, res, next) => {
	let copy = JSON.stringify(req.user);
	copy = JSON.parse(copy);
	copy.password = undefined;
	copy.resetPasswordExpires = undefined;
	copy.resetPasswordToken = undefined;

	return res.json({
		message: "SignIn successfull",
		data: {
			user: copy,
			session: req.session,
		},
	});
};

let sendCurrentUser = (req, res, next) => {
	return res.json({
		success: 1,
		message: "Current user.",
		data: {
			user: req.user,
		},
	});
};

let logout = function (req, res, next) {
	req.logout();
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		}
		return res.json({
			success: 1,
			message: "Logged Out",
			data: {},
		});
	});
};

module.exports = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	createUser,
	logInUser,
	sendSignInSuccess,
	logout,
	sendCurrentUser,
};
