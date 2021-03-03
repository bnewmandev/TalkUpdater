const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "link",
	description: "gives link",
	async execute(message, args, globalArgs) {
		const ServerModel = globalArgs.ServerModel;
		const server = await ServerModel.findOne({ guildID: message.guild.id });
		message.reply(`http://${process.env.ADDRESS}/?id=${server.permanantCode}`);
	},
};
