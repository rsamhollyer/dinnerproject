const { layout } = require("../utils");

const members = (req, res) => {
	const { username } = req.session.user;
	res.render("members-only", {
		...layout,
		locals: {
			username,
			pageTitle: `${username}'s Special Place`,
		},
	});
};

module.exports = {
	members,
};
