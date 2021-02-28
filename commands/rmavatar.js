const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "rmavatar",
	description: "rmavatar",
	async execute(message, args, io) {
		const user = message.member.user;
		const data = JSON.parse(fs.readFileSync("./ref.json"));
		if (user.id in data) {
			data[user.id].altAvatar = false;
		} else {
			data[user.id] = {
				user: user,
				enabled: false,
				altAvatar: false,
			};
		}
		fs.writeFileSync("./ref.json", JSON.stringify(data));
		message.reply("Your discord avatar is now being used");
	},
};
