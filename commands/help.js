module.exports = {
	name: "help",
	description: "displays command list",
	execute(message, args) {
		const msg = `
--------------------------------------------------------------------------------------------------------------------
This bot is designed to get voice activity data from a voice channel and pipe it to a webserver.
In practical terms this allows for a stream to add a browser source to show who is speaking.

Setup:
- run the init command (need permission to edit roles) only needs to be done once
- give the Pogerator role to anyone who you want to use the bot
- run the connect command while in a voice channel
- run the capture command to setup the output with all users in the voice channel
- each user who wants to be displayed should run >enableme

\`\`\`
>help - displays this message
>init - sets up permissions
>connect - connects bot to voice channel
>disconnect - disconnects bot from channel
>capture - updates connected users
>flip - flips the output
>refresh - refreshes the webpage (debugging)
>avatar IMAGE_URL - sets avatar as image
>avatar - sets avatar as discord logo
>rmavatar - uses discord avatar
>enableme - adds user to the overlay
>disableme - removes user from the overlay (default)
>pog - pogs
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
