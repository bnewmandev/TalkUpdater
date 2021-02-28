const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "flip",
	description: "flips socket output side",
	async execute(message, args, io) {
		io.emit("flip", { flip: true });
		return message.channel.send("Output has been flipped");
	},
};
