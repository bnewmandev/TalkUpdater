const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "avatarshape",
	description: "changes avatar shape",
	async execute(message, args, globalArgs) {
		const roleName = globalArgs.globalArgs;
		const ServerModel = globalArgs.ServerModel;

		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (l1 === undefined) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		const l2 = await ServerModel.findOne({ guildID: message.guild.id });
		if (!l2) {
			return message.reply(`please run ${globalArgs.prefix}init first`);
		}
		if (l2.avatarCircle) {
			const server = await ServerModel.findOneAndUpdate(
				{ guildID: message.guild.id },
				{ avatarCircle: false }
			);
			return message.reply("The avatars are now square");
		} else {
			const server = await ServerModel.findOneAndUpdate(
				{ guildID: message.guild.id },
				{ avatarCircle: true }
			);
			return message.reply("The avatars are now circular");
		}
	},
};
