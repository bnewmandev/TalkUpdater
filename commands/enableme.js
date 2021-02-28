const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "enableme",
	description: "enableme",
	async execute(message, args, io) {
		const user = message.member.user;
		const data = JSON.parse(fs.readFileSync("./ref.json"));
		if (user.id in data) {
			data[user.id].enabled = true;
		} else {
			data[user.id] = {
				user: user,
				enabled: true,
			};
		}
		fs.writeFileSync("./ref.json", JSON.stringify(data));
		return message.reply("Ok, I will add you to the overlay");
	},
};
