module.exports = {
	name: "disconnect",
	description: "disconnect from voice",
	async execute(message, args, io, roleName) {
		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (!l1) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		const serverU = await ServerModel.findOneAndUpdate(
			{
				guildID: message.guild.id,
			},
			{
				songInfo: null,
				playlist: undefined,
			}
		);
		const connection = await message.member.voice.channel.join();
		connection.disconnect();
	},
};
