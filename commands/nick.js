const Discord = require("discord.js");
const fs = require("fs");
const { nextTick } = require("process");
const { findOneAndUpdate, findOne } = require("../database/models/User");

module.exports = {
	name: "nick",
	description: "nickname",
	async execute(message, args, globalArgs) {
		const UserModel = globalArgs.UserModel;
		const user = await UserModel.findOne({
			userID: message.member.user.id,
			guildID: message.guild.id,
		});
		if (!user) return message.reply("Please run enableme command");
		if (args.length !== 1) {
			const userTwo = await UserModel.findOneAndUpdate(
				{
					userID: message.member.user.id,
					guildID: message.guild.id,
				},
				{ nickname: null }
			);
			return message.reply("Nickname removed");
		} else {
			const userTwo = await UserModel.findOneAndUpdate(
				{
					userID: message.member.user.id,
					guildID: message.guild.id,
				},
				{ nickname: args[0] }
			);
			return message.reply("New nickname: " + args[0]);
		}
	},
};
