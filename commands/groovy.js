const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "groovy",
	description: "currently playing",
	async execute(message, args, globalArgs) {
		const roleName = globalArgs.roleName;
		const io = globalArgs.io;
		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (l1 === undefined) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		io.emit("flip", { flip: true });
		return message.channel.send("Output has been flipped");
	},
};
