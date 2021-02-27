const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "connect",
	description: "Connect to voice",
	async execute(message, args, io) {
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
		} else {
			return message.reply(
				"Please join a voice call before using this command"
			);
		}
	},
};
