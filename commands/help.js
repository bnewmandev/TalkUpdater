module.exports = {
	name: "help",
	description: "displays command list",
	execute(message, args) {
		// message.channel.send(
		// 	">help - displays this menu\n>connect - connects bot to voice channel\n>capture - opens web socket\n>pog - pog\n"
		// );
		message.channel.send(">help - displays this menu");
		message.channel.send(">connect - connects bot to voice channel");
		message.channel.send(">capture - updates connected users");
		message.channel.send(">flip - flips the output");
		message.channel.send(">pog - pogs");
	},
};
