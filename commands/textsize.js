const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "textsize",
	description: "changes font size",
	async execute(message, args, globalArgs) {
		const roleName = globalArgs.roleName;
		const io = globalArgs.io;
		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (!l1) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		if (args.length === 1) {
			const tsize = parseInt(args[0]);
			if (!tsize) {
				return message.reply("Please enter a number");
			}
			io.emit("TEXTSIZE", tsize);
		} else {
			return message.reply("Resetting text size to 40");
			io.emit("TEXTSIZE", 40);
		}
	},
};
