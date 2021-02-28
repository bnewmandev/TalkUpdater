const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "refresh",
	description: "refreshes the webpage",
	async execute(message, args, io) {
		io.emit("refresh", { refresh: true });
		return message.channel.send("Refreshed webpage");
	},
};
