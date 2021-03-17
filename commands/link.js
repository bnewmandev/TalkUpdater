const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "link",
	description: "gives link",
	async execute(message, args, globalArgs) {
		const ServerModel = globalArgs.ServerModel;
		const server = await ServerModel.findOne({ guildID: message.guild.id });
		message.reply(
			`Server live on ${process.env.ADDRESS}/overlay/index.html?id=${server.permanantCode}`
		);
	},
};
