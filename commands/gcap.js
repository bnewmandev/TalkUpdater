const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "gcap",
	description: "currently playing",
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
		io.emit("groovy", { groovy: true });
		return message.channel.send("GROOVI");
	},
};
