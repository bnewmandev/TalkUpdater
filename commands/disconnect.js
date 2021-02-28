module.exports = {
	name: "disconnect",
	description: "disconnect from voice",
	async execute(message, args, io, roleName) {
		let l1 = message.member.roles.cache.some(
			(role) => role.name === "Pogerator"
		);
		if (l1 === undefined) {
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
