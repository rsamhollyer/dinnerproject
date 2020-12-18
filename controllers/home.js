const { layout } = require("../utils");

const home = (req, res) => {
	res.render("index", {
		...layout,
		locals: {
			pageTitle: "Home",
		},
	});
};

module.exports = {
	home,
};
