const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "disableme",
	description: "disableme",
	async execute(message, args, io) {
		const user = message.member.user;
		const data = JSON.parse(fs.readFileSync("./ref.json"));
		if (user.id in data) {
			data[user.id].enabled = false;
		} else {
			data[user.id] = {
				user: user,
				enabled: false,
			};
		}
		fs.writeFileSync("./ref.json", JSON.stringify(data));
		return message.reply("Ok, I will remove you from the overlay");
	},
};
