const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "debug-forcejoinmessage",
	description: "gives link",
	async execute(message, args, globalArgs) {
		message.channel.send(
			`Hi, Thank you for adding me to the server, please go to ${process.env.ADDRESS}/dashboard/${message.guild.id} to view the dashboard`
		);
	},
};
