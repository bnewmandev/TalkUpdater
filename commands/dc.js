module.exports = {
	name: "dc",
	description: "disconnect from voice",
	async execute(message, args, globalArgs) {
		const roleName = globalArgs.roleName;
		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (!l1) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}
		const connection = await message.member.voice.channel.join();
		connection.disconnect();
	},
};
