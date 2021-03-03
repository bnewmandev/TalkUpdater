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
				`Please run the ${globalArgs.prefix}enableme and ${globalArgs.prefix}the init commands first`
			);
		message.reply("Your avatar has been reset to default");
	},
};
