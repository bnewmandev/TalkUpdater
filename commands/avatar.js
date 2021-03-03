const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "avatar",
	description: "avatar",
	async execute(message, args, globalArgs) {
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
			const user = await UserModel.findOneAndUpdate(
				{
					guildID: message.guild.id,
					userID: userFULL.id,
				},
				{ avatarState: 1, avatarURL: args[0] }
			);
			message.reply(`Your avatar is ${args[0]}`);
		} else {
			const user = await UserModel.findOneAndUpdate(
				{
					guildID: message.guild.id,
					userID: userFULL.id,
				},
				{ avatarState: 2 }
			);
			message.reply("Your avatar has been set as the discord avatar");
		}
	},
};
