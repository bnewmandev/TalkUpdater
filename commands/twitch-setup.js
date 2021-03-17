const Discord = require("discord.js");
const fs = require("fs");
const uuid = require("uuid");

module.exports = {
	name: "twitch-setup",
	description: "twitch integration",
	async execute(message, args, globalArgs) {
		const UserModel = globalArgs.UserModel;
		const roleName = globalArgs.roleName;
		const io = globalArgs.io;
		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (!l1) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		const clientID = "p5pnijeqb5stamtxhwo71mg4ys0221";
		const redirectUri = `http://${process.env.ADDRESS}/twitch/connect`;
		const responseType = "code";
		const user = await UserModel.findOne({
			userID: message.member.user.id,
			guildID: message.guild.id,
		});
		if (user) {
			let state = uuid.v4();
			const scope =
				"openid%20chat:read%20chat:edit%20channel:moderate%20whispers:read%20whispers:edit%20channel_editor";
			message.author.send(
				`https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}&force_verify=true`
			);
			const now = Date.now();
			const u1 = await UserModel.findOneAndUpdate(
				{
					userID: message.member.user.id,
					guildID: message.guild.id,
				},
				{
					twitchData: {
						state: state,
						isValid: true,
						time: now,
					},
				}
			);
		}
	},
};
