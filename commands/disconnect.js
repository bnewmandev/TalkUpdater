module.exports = {
	name: "disconnect",
	description: "disconnect from voice",
	async execute(message, args, io) {
		const connection = await message.member.voice.channel.join();
		connection.disconnect();
	},
};
