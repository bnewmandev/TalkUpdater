const Discord = require("discord.js");
const fs = require("fs");
const { isObject } = require("util");

module.exports = {
	name: "capture",
	description: "Connect to voice",
	async execute(message, args, globalArgs) {
		const roleName = globalArgs.roleName;
		const io = globalArgs.io;
		const UserModel = globalArgs.UserModel;
		const ServerModel = globalArgs.ServerModel;

		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (l1 === undefined) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		let publicData = [];
		if (message.member.voice.channel) {
			const users = message.member.voice.channel.members;

			const server = await ServerModel.findOne({ guildID: message.guild.id });
			await users.forEach(async (elem) => {
				const user = await UserModel.findOne({
					guildID: message.guild.id,
					userID: elem.user.id,
				});
				if (!user) return;
				if (user.enabled === false) return;
				let avatarU = elem.user.avatarURL();
				if (user.avatarState === 1) {
					avatarU = user.avatarURL;
				}
				if (user.avatarState === 2) {
					avatarU = "https://cdn.discordapp.com/embed/avatars/0.png";
				}
				let nName = elem.user.username;
				if (user.nickname) {
					nName = user.nickname;
				}
				if (user.forceName) {
					nName = user.forceName;
				}
				let nCol = user.nameCol;
				if (!user.nameCol) {
					nCol = "#ffffff";
				}
				if (server.nameCol) {
					nCol = server.nameCol;
				}
				let aCol = user.activeCol;
				if (!aCol) {
					aCol = "#ff0000";
				}
				if (server.activeCol) {
					nCol = server.activeCol;
				}
				const dat = {
					avatar: avatarU,
					name: nName,
					id: elem.user.id,
					nameCol: nCol,
					activeCol: aCol,
				};
				let i = publicData.push(dat);
				console.log(i);
			});
			setTimeout(() => {
				let sendData = {
					data: publicData,
					gid: server.permanantCode,
					guid: server.guildID,
					circle: server.avatarCircle,
					speakOnly: server.speakOnly,
				};
				console.log(sendData);
				io.emit("users", sendData);
			}, 100);
		} else {
			return message.reply(
				"Please join a voice call before using this command"
			);
		}
	},
};
