const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "about",
	description: "about",
	async execute(message, args, io) {
		const msg = `
Author: Ben Newman
Website: www.bnewman.dev
Email: dc@bnewman.dev
Made for: www.twitch.tv/notbosch
        `;
	},
};
