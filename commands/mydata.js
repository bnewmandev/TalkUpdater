module.exports = {
	name: "mydata",
	description: "gets all data relating to current user",
	async execute(message, args, globalArgs) {
		const UserModel = globalArgs.UserModel;
		const user = await UserModel.find({ userID: message.member.user.id });
		try {
			await message.author.send(
				`\`\`\`json\n${JSON.stringify(user, null, 2)}\`\`\``
			);
		} catch (error) {
			message.reply("You need to enable DMs for this feature to work");
		}
	},
};
