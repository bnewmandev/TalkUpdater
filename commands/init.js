module.exports = {
	name: "init",
	description: "init",
	async execute(message, args, roleName) {
		if (!message.member.hasPermission("MANAGE_ROLES")) {
			return message.reply(
				"You need the manage roles permission to use this command"
			);
		}

		let r1 = message.guild.roles.cache.find((x) => x.name === roleName);
		if (typeof r1 !== undefined) {
			return message.reply("The server has already been initialised");
		}

		let role = await message.guild.roles.create({
			data: { name: `${roleName}`, permissions: [] },
		});
	},
};
