const Discord = require("discord.js");
const fs = require("fs");
const { createCanvas } = require("canvas");

module.exports = {
	name: "namecol",
	description: "change name colour",
	async execute(message, args, globalArgs) {
		isHexColor = (hex) =>
			typeof hex === "string" && hex.length === 6 && !isNaN(Number("0x" + hex));
		const UserModel = globalArgs.UserModel;
		const userFULL = message.member.user;
		const CHECK = await UserModel.findOne({
			guildID: message.guild.id,
			userID: userFULL.id,
		});
		if (!CHECK) {
			return message.reply(
				"Please run the enableme and the init command first"
			);
		}
		if (args.length === 1) {
			if (isHexColor(args[0])) {
				const canvas = createCanvas(64, 64);
				const context = canvas.getContext("2d");
				context.fillStyle = "#" + args[0];
				context.fillRect(0, 0, 64, 64);
				const attachment = new Discord.MessageAttachment(
					canvas.toBuffer(),
					"color.png"
				);
				const user = await UserModel.findOneAndUpdate(
					{
						guildID: message.guild.id,
						userID: userFULL.id,
					},
					{ nameCol: "#" + args[0] }
				);
				message.reply("Your new text colour: ", attachment);
			} else {
				message.reply(
					"This colour is invalid, please enter a hex colour value without the (i.e. ffffff - for white)"
				);
			}
		} else {
			const user = await UserModel.findOneAndUpdate(
				{
					guildID: message.guild.id,
					userID: userFULL.id,
				},
				{ nameCol: "#ffffff" }
			);
			message.reply("Your text color has been reset to white");
		}
	},
};
