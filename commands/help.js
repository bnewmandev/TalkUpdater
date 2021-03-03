module.exports = {
	name: "help",
	description: "displays command list",
	execute(message, args, globalArgs) {
		const msg = `
--------------------------------------------------------------------------------------------------------------------
This bot is designed to get voice activity data from a voice channel and pipe it to a webserver.
In practical terms this allows for a stream to add a browser source to show who is speaking.

Setup:
- run the init command (need permission to edit roles) only needs to be done once
- give the ${globalArgs.roleName} role to anyone who you want to use the bot
- run the connect command while in a voice channel
- run the capture command to setup the output with all users in the voice channel
- each user who wants to be displayed should run ${globalArgs.prefix}enableme

\`\`\`
${globalArgs.prefix}help - displays this message
${globalArgs.prefix}init - sets up permissions
${globalArgs.prefix}connect - connects bot to voice channel
${globalArgs.prefix}disconnect - disconnects bot from channel
${globalArgs.prefix}capture - updates connected users
${globalArgs.prefix}flip - flips the output
${globalArgs.prefix}refresh - refreshes the webpage (debugging)
${globalArgs.prefix}avatar IMAGE_URL - sets avatar as image
${globalArgs.prefix}avatar - sets avatar as discord logo
${globalArgs.prefix}rmavatar - uses discord avatar
${globalArgs.prefix}enableme - adds user to the overlay
${globalArgs.prefix}disableme - removes user from the overlay (default)
${globalArgs.prefix}nick - remove nickname
${globalArgs.prefix}nick NICKNAME - sets nickname
${globalArgs.prefix}pog - pogs
\`\`\`
-------------------------------------
Author: Ben Newman
Website: www.bnewman.dev
Email: dc@bnewman.dev
Github: www.github.com/jam1nb3n
Discord: jam1nb3n#1440
-------------------------------------

--------------------------------------------------------------------------------------------------------------------
		`;
		message.channel.send(msg);
	},
};
