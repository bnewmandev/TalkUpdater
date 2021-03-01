const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "rmavatar",
	description: "rmavatar",
	async execute(message, args, globalArgs) {
		const UserModel = globalArgs.UserModel;
		const userFULL = message.member.user;
		const user = await UserModel.findOneAndUpdate(
			{
				guildID: message.guild.id,
				userID: userFULL.id,
			},
			{ avatarState: 0 }
		);
		if (!user)
			return message.reply(
				"Please run the enableme and the init command first"
			);
		message.reply("Your avatar has been reset to default");
	},
};
