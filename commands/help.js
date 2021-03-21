module.exports = {
	name: "help",
	description: "displays command list",
	execute(message, args, globalArgs) {
		const msg = `
--------------------------------------------------------------------------------------------------------------------
This is a full list of all the commands avaliable for this bot, some commands need the role ${globalArgs.roleName}. Please use the \`${globalArgs.prefix}guide\` command to view the setup and usage guide

${globalArgs.prefix}activecol ###### - sets accent color to hex code given - all users
${globalArgs.prefix}activecol - resets the active color to red - all users
${globalArgs.prefix}avatar IMAGE_URL - sets avatar as image - all users
${globalArgs.prefix}avatar - sets avatar as discord logo - all users
${globalArgs.prefix}avatarshape - toggles between circle and square avatar - ${globalArgs.roleName}
${globalArgs.prefix}capture - synchronises data from connected and enabled users - all users
${globalArgs.prefix}connect (con) - connects bot to current voice channel - ${globalArgs.roleName}
${globalArgs.prefix}disableme - removes user from the active user list - all users
${globalArgs.prefix}disconnect (dc) - disconnects bot from channel - ${globalArgs.roleName}
${globalArgs.prefix}edituser - opens user editing page - all users
${globalArgs.prefix}enableme - adds user to active user list - all users
${globalArgs.prefix}flip - flips the output - ${globalArgs.roleName}
${globalArgs.prefix}glink - enables currently playing integration with groovy - ${globalArgs.roleName}
${globalArgs.prefix}gcap - synchronises groovy info - ${globalArgs.roleName}
${globalArgs.prefix}help - displays this message - all users
${globalArgs.prefix}init - sets up permissions and roles for server - administrator
${globalArgs.prefix}link - shows the connection link - all users
${globalArgs.prefix}mydata - provides information on all data stored of the user - all users
${globalArgs.prefix}namecol ###### - sets name color to hex code given - all users
${globalArgs.prefix}namecol - resets the name color to white - all users
${globalArgs.prefix}nick - remove nickname - all users
${globalArgs.prefix}nick NICKNAME - sets nickname - all users
${globalArgs.prefix}rmavatar - uses your discord avatar - all users
${globalArgs.prefix}serverconfig - opens server settings page - ${globalArgs.roleName}
${globalArgs.prefix}speakonly - toggles between displaying only when speaking and always displaying - ${globalArgs.roleName}
${globalArgs.prefix}textsize # - sets text size to #px - ${globalArgs.roleName}
${globalArgs.prefix}twitch-setup - links twitch account to discord user ${globalArgs.roleName}
${globalArgs.prefix}twitch - starts listening to song data and enables twitch commands !song and !playlist

-------------------------------------
Author: Ben Newman
Website: www.bnewman.dev
Email: dc@bnewman.dev
Github: www.github.com/jam1nb3n
Discord: jam1nb3n#1440
-------------------------------------
Please feel free to get in touch if there are any feature you would like added
Please consider donating at https://www.paypal.me/bnewmandev
--------------------------------------------------------------------------------------------------------------------
		`;
		message.channel.send(msg, { split: true });
	},
};
