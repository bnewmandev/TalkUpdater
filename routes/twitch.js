const express = require("express");
const router = express.Router();
const url = require("url");
const querystring = require("querystring");
const https = require("https");
const axios = require("axios");
const getToken = require("../lib/twitch/getToken");

const ServerModel = require("../database/models/Server");
const UserModel = require("../database/models/User");

router.get("/connect", async (req, res, next) => {
	// res.send(req.query);
	const user = await UserModel.findOne({
		"twitchData.isValid": true,
		"twitchData.state": req.query.state,
	});
	if (!user) return res.send("UNKNOWN ERROR");
	let time = Date.now();
	if (user.twitchData.time > time + 300000)
		return res.send("Auth timeout, please try again");
	const token = await getToken(req.query.code);
	const u1 = await UserModel.findOneAndUpdate(
		{
			"twitchData.isValid": true,
			"twitchData.state": req.query.state,
		},
		{
			"twitchData.isValid": false,
			"twitchData.code": req.query.code,
			"twitchData.token": token,
		}
	);
	res.send("SUCCESS");
});

module.exports = router;
