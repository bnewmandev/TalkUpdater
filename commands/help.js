module.exports = {
	name: "help",
	description: "displays command list",
	execute(message, args) {
		const msg = `
>help - displays this menu
>connect - connects bot to voice channel
>disconnect - disconnects bot from channel
>capture - updates connected users
>flip - flips the output
>refresh - refreshes the webpage (debugging)
>pog - pogs
		`;
		message.channel.send(msg);
	},
};
