module.exports = {
	name: "ping",
	description: "Ping!",
	execute(message, args, io) {
		message.channel.send("Pong.");
	},
};
