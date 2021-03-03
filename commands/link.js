const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "link",
	description: "gives link",
	async execute(message, args, io, roleName) {
		message.reply(`http://${process.env.ADDRESS}/?id=${server.permanantCode}`);
	},
};
