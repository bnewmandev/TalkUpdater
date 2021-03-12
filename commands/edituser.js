const Discord = require("discord.js");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

module.exports = {
	name: "edituser",
	description: "edit user WIP",
	async execute(message, args, globalArgs) {
		const UserModel = globalArgs.UserModel;
		const user = await UserModel.findOne({
			userID: message.member.user.id,
			guildID: message.guild.id,
		});
		if (!user) {
			return message.reply(
				"ERROR, Server not initialized or user not initialised"
			);
		}
		const pfUUID = uuid.v4();
		const salt = bcrypt.genSaltSync(10);
		const refCode = bcrypt.hashSync(pfUUID, salt);
		const guID = `${message.guild.id}:${message.member.user.id}`;
		const updateUser = await UserModel.findOneAndUpdate(
			{
				userID: message.member.user.id,
				guildID: message.guild.id,
			},
			{ refCode: refCode }
		);
		message.author.send(
			`Please use this link to edit your settings: http://${process.env.ADDRESS}/edit/edit.html?guid=${guID}&ref=${refCode}`
		);
	},
};
