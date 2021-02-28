const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "connect",
	description: "Connect to voice",
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
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			if (process.env.IP) {
				return message.channel.send(
					"Server live on " +
						process.env.IP +
						" please open page then run capture command"
				);
			}
		} else {
			return message.reply(
				"Please join a voice call before using this command"
			);
		}
	},
};
