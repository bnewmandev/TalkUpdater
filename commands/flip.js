const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "flip",
	description: "flips socket output side",
	async execute(message, args, io, roleName) {
		if (message.member.roles.cache.some((role) => role.name !== roleName)) {
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