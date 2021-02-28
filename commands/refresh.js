const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "refresh",
	description: "refreshes the webpage",
	async execute(message, args, io, roleName) {
		let l1 = message.member.roles.cache.some(
			(role) => role.name === "Pogerator"
		);
		if (l1 === undefined) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		io.emit("refresh", { refresh: true });
		return message.channel.send("Refreshed webpage");
	},
};
