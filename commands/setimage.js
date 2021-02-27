const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "setimage",
	description: "Sets new image",
	async execute(message, args, io) {
		console.log(member);
		let inObj = JSON.parse(fs.readFileSync("./ref.json"));
		inObj[message.member.id] = args[0];
		fs.writeFileSync("./ref.json", JSON.stringify(inObj));
	},
};
