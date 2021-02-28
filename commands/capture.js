const Discord = require("discord.js");
const fs = require("fs");
const { isObject } = require("util");

module.exports = {
	name: "capture",
	description: "Connect to voice",
	async execute(message, args, io, roleName) {
		if (message.member.roles.cache.some((role) => role.name !== roleName)) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		if (message.member.voice.channel) {
			const users = message.member.voice.channel.members;
			let publicData = [];
			users.forEach((elem) => {
				const avatar = elem.user.avatarURL();
				const user = {
					name: elem.displayName,
					avatar: avatar,
					id: elem.id,
				};
				if (user.id != 815264045875593266) {
					publicData.push(user);
				}
			});
			io.emit("users", publicData);
		} else {
			return message.reply(
				"Please join a voice call before using this command"
			);
		}
	},
};
