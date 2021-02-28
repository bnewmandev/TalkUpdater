const Discord = require("discord.js");
const e = require("express");
const fs = require("fs");

module.exports = {
	name: "avatar",
	description: "avatar",
	async execute(message, args, io) {
		const user = message.member.user;
		const data = JSON.parse(fs.readFileSync("./ref.json"));
		if (user.id in data) {
			if (args.length !== 0) {
				data[user.id].altAvatar = args[0];
			} else {
				data[user.id].altAvatar =
					"https://cdn.discordapp.com/embed/avatars/0.png";
			}
		} else {
			data[user.id] = {
				user: user,
				enabled: false,
				altAvatar: args[0],
			};
		}
		fs.writeFileSync("./ref.json", JSON.stringify(data));
		message.reply("Your new avatar has been set");
	},
};
