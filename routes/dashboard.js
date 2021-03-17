const express = require("express");
const router = express.Router();

const ServerModel = require("../database/models/Server");
const UserModel = require("../database/models/User");

router.use("/:guildID", async (req, res, next) => {
	const server = await ServerModel.findOne({ guildID: req.params.guildID });
	if (server) {
		res.send(server.guildAlias);
	} else {
		res.send("SERVER NOT FOUND");
	}
});

module.exports = router;
