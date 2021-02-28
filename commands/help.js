module.exports = {
	name: "help",
	description: "displays command list",
	execute(message, args) {
		const msg = `
--------------------------------------------------------------------------------------------------------------------
This bot is designed to get voice activity data from a voice channel and pipe it to a webserver.
In practical terms this allows for a stream to add a browser source to show who is speaking.

>help - displays this message
>init - sets up permissions
>connect - connects bot to voice channel
>disconnect - disconnects bot from channel
>capture - updates connected users
>flip - flips the output
>refresh - refreshes the webpage (debugging)
>pog - pogs

You are free to use my code so long as the following message is included prominantly in the application:

-------------------------------------
Original Author: Ben Newman
Website: www.bnewman.dev
Email: dc@bnewman.dev
Github: www.github.com/jam1nb3n
Discord: jam1nb3n#1440

Designed for: www.twitch.tv/notbosch
-------------------------------------

Please enjoy and feel free to message me if you find any bugs
--------------------------------------------------------------------------------------------------------------------
		`;
		message.channel.send(msg);
	},
};
