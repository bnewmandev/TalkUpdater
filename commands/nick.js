const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "about",
	description: "about",
	async execute(message, args, io) {
		const user = message.member.user;
		const data = JSON.parse(fs.readFileSync("./ref.json"));
		let nick = "";
		if (args.length === 1) {
			nick = args[0];
		}
		if (user.id in data) {
			data[user.id].nickname = nick;
		} else {
			data[user.id] = {
				user: user,
				enabled: false,
				nickname: nick,
			};
		}
	},
};
