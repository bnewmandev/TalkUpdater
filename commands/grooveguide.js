module.exports = {
	name: "gguide",
	description: "displays guide",
	execute(message, args, globalArgs) {
		const msg = `
--------------------------------------------------------------------------------------------------------------------
PLEASE READ THE GENERAL GUIDE FIRST \`${globalArgs.prefix}guide\`

FOR TWITCH BOT:

FOR ${globalArgs.roleName}s:
1) Run \`${globalArgs.prefix}twitch-config\` to connect to your twitch account (once per discord server)
2) Run \`${globalArgs.prefix}twitch\` to synchronise groovy with your twitch chat
--------------------------------------------------------------------------------------------------------------------
FOR OVERLAY:
1) Run \`${globalArgs.prefix}glink\` to show the link for the overlay and start listening for song data
2) Run \`${globalArgs.prefix}gcap\` to synchronise song data with the overlay

On twitch run !song to give the song name and link or !playlist to give the playlist link
--------------------------------------------------------------------------------------------------------------------
		`;
		message.channel.send(msg);
	},
};
