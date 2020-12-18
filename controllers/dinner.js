const { layout } = require("../utils");
const { DinnerIdea } = require("../models");

const showForm = (req, res) => {
	res.render("dinner/form", {
		...layout,
		locals: {
			pageTitle: "Dinner Form",
		},
	});
};

const processForm = async (req, res) => {
	const { name } = req.body;
	const { id } = req.session.user;
	let { rating } = req.body;
	rating = parseInt(rating, 10);
	// Pull the logged userid from the req.session....
	if (name && id) {
		const newDinner = await DinnerIdea.create({
			name,
			rating,
			userID: id,
		});
		console.log(newDinner);
		res.redirect(`${req.baseUrl}/`);
	} else {
		res.redirect(req.url);
	}
};

const list = async (req, res) => {
	const { id } = req.session.user;
	if (id) {
		const dinners = await DinnerIdea.findAll({
			where: {
				userID: id,
			},
		});
		res.render("dinner/list", {
			...layout,
			locals: {
				pageTitle: "Dinner List",
				dinners,
			},
		});
	} else {
		res.redirect("/");
	}
};

const showEditForm = async (req, res) => {
	const { id } = req.session.user;
	const { dinnerId } = req.params;
	if (id && dinnerId) {
		const dinner = await DinnerIdea.findOne({
			where: {
				id: dinnerId,
			},
		});
		console.log(`YOU WANT TO EDIT DINNER WITH ID ${dinnerId}`);
		res.render("dinner/edit", {
			...layout,
			locals: {
				pageTitle: "Edit Dinner Lists",
				dinner,
			},
		});
	} else {
		res.redirect("/");
	}
};

const processEditForm = async (req, res) => {
	const { id } = req.session.user;
	const { dinnerId } = req.params;
	const { name } = req.body;

	if (id && dinnerId) {
		const dinner = await DinnerIdea.update(
			{
				name,
			},
			{
				where: {
					id: dinnerId,
				},
			}
		);
		console.log(`YOU UPDATED DINNER WITH ID ${dinnerId}`);
		res.redirect("/dinners");
	} else {
		res.redirect("/");
	}
};

const del = async (req, res) => {
	const { id } = req.session.user;
	const { dinnerId } = req.params;
	if (id && dinnerId) {
		const dinner = await DinnerIdea.destroy({
			where: {
				id: dinnerId,
			},
		});
		console.log(`YOU DELETED DINNER WITH ID ${dinnerId}`);
		res.redirect("/dinners");
	} else {
		res.redirect("/");
	}
};

module.exports = {
	showForm,
	processForm,
	list,
	showEditForm,
	processEditForm,
	del,
};
