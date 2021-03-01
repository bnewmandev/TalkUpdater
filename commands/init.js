const mongoose = require("mongoose");
const uuid = require("uuid");

module.exports = {
	name: "init",
	description: "init",
	async execute(message, args, globalArgs) {
		const roleName = globalArgs.roleName;
		const ServerModel = globalArgs.ServerModel;
		if (!message.member.hasPermission("MANAGE_ROLES")) {
			return message.reply(
				"You need the manage roles permission to use this command"
			);
		}

		const guild = await ServerModel.findOne({ guildID: message.guild.id });
		let state = true;
		if (!guild) {
			state = false;
			const time = Date.now();
			const bufferID = new Buffer.from(message.guild.id);
			const sessionID = bufferID.toString("base64");
			const newGuild = await new ServerModel({
				guildID: message.guild.id,
				guildAlias: message.guild.name,
				ownerID: message.guild.owner.user.id,
				ownerTag: message.guild.owner.user.tag,
				permanantCode: sessionID,
				isPremium: false,
				joinedOn: time,
			});
			newGuild.save((err) => {
				if (err) return console.log(err);
			});
		}

		let r1 = message.guild.roles.cache.find((x) => x.name === roleName);
		if (typeof r1 !== undefined && state) {
			return message.reply("The server has already been initialised");
		}

		let role = await message.guild.roles.create({
			data: { name: `${roleName}`, permissions: [] },
		});
		return message.reply("Initialisation complete.");
	},
};
