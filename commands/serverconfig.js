const Discord = require("discord.js");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

module.exports = {
	name: "serverconfig",
	description: "edit user WIP",
	async execute(message, args, globalArgs) {
		const UserModel = globalArgs.UserModel;
		const ServerModel = globalArgs.ServerModel;
		const roleName = globalArgs.roleName;
		const user = await UserModel.findOne({
			userID: message.member.user.id,
			guildID: message.guild.id,
		});
		if (!user) {
			return message.reply("ERROR, Server not initialized");
		}
		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (!l1) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		const pfUUID = uuid.v4();
		const salt = bcrypt.genSaltSync(10);
		const refCode = bcrypt.hashSync(pfUUID, salt);
		const gID = `${message.guild.id}`;
		const updateServer = await ServerModel.findOneAndUpdate(
			{
				guildID: message.guild.id,
			},
			{ refCode: refCode }
		);
		try {
			await message.author.send(
				`Please use this link to edit your settings: ${process.env.ADDRESS}/server/server.html?gid=${gID}&ref=${refCode}`
			);
			message.reply("Please check your DMs");
		} catch (err) {
			message.reply("You need to enable DMs for this feature to work");
		}
	},
};
