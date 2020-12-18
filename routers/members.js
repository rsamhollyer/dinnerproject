const express = require("express");
const router = express.Router();

const { members } = require("../controllers/members");

router.get("/", members);

module.exports = router;
