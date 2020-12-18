const bcrypt = require("bcryptjs");
const { layout } = require("../utils");
const { User } = require("../models");

const newUser = (req, res) => {
	res.render("create-account", {
		...layout,
		locals: {
			pageTitle: "Create Account",
		},
	});
};

const processNewUser = async (req, res) => {
	const { username, password } = req.body;
	if (username == "" || password == "") {
		console.log(`username /password is blank`);
		res.redirect(`${req.baseUrl}/new`);
	} else {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		console.log(username);
		console.log(salt);
		console.log(hash);
		try {
			const newUser = await User.create({
				username,
				hash,
			});
			res.redirect(`${req.baseUrl}/login`);
		} catch (err) {
			console.log(err.name);
			if (err.name === "SequelizeUniqueConstraintError") {
			}
			res.redirect(`${req.baseUrl}/new`);
		}
	}
};

const login = (req, res) => {
	res.render("create-account", {
		...layout,
		locals: {
			pageTitle: "Login",
		},
	});
};

const processLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({
		where: {
			username,
		},
	});
	if (user) {
		console.log(`VALID USER`);
		const isValid = bcrypt.compareSync(password, user.hash);
		if (isValid) {
			console.log(`PASSWORD IS GOOD`);
			req.session.user = {
				username,
				id: user.id,
			};
			req.session.save(() => {
				res.redirect("/members-only");
			});
		} else {
			console.log(`PASSWORD IS WRONG`);
			res.redirect(`${req.baseUrl}/login`);
		}
	} else {
		console.log(`NOT VALID USER`);
		res.redirect(`${req.baseUrl}/login`);
	}
};

const logout = (req, res) => {
	console.log(`LOGGING OUT`);
	req.session.destroy(() => {
		res.redirect("/");
	});
};

module.exports = {
	newUser,
	processNewUser,
	login,
	processLogin,
	logout,
};
