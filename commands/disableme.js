const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "disableme",
	description: "disableme",
	async execute(message, args, globalArgs) {
		const ServerModel = globalArgs.ServerModel;
		const UserModel = globalArgs.UserModel;
		const userFULL = message.member.user;

		console.log(ServerModel);
		const server = await ServerModel.findOne({ guildID: message.guild.id });
		if (!server) return message.reply("please run >init first");
		const user = await UserModel.findOneAndUpdate(
			{
				guildID: message.guild.id,
				userID: userFULL.id,
			},
			{ enabled: false }
		);
		if (user) {
			return message.reply("Ok, I will remove you from the overlay");
		} else {
			const newUser = await new UserModel({
				userID: userFULL.id,
				guildID: message.guild.id,
				enabled: false,
				avatarState: 0,
				avatarURL: null,
			});
			newUser.save((err) => {
				if (err) return console.log(err);
			});
			return message.reply("Ok, I will remove you from the overlay");
		}
	},
};
