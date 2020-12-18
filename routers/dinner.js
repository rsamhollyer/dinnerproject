const express = require("express");
const router = express.Router();

const {
	showForm,
	processForm,
	list,
	showEditForm,
	processEditForm,
	del,
} = require("../controllers/dinner");

router
	.get("/", list)
	.get("/new", showForm)
	.post("/new", processForm)
	.post("/:dinnerId/delete", del)
	.get("/:dinnerId/edit", showEditForm)
	.post("/:dinnerId/edit", processEditForm);

module.exports = router;
