module.exports = {
	name: "guide",
	description: "displays guide",
	execute(message, args, globalArgs) {
		const msg = `
--------------------------------------------------------------------------------------------------------------------
Hi, this bot is designed for streamers to have a highly customisable overlay showing voice data.
This bot is currently in early alpha and as such you may experience issues. Please contact me at jam1nb3n#1440
if you have any questions or suggestions

FOR SERVER ADMINS:
1) Run \`${globalArgs.prefix}init\` - This creates the necessary roles and permissions for the bot to work
2) Give the ${globalArgs.roleName} role to users who will be able to manage the overlay bot

FOR ${globalArgs.roleName}s:
OPTIONAL - run the \`${globalArgs.prefix}serverconfig\` to edit server settings
1) Run the commands for a user first (see below)
2) Join a voice chat
3) Run the \`${globalArgs.prefix}con\` command to connect the bot to the channel
4) Open the link given by the bot (make sure it loads BEFORE continuing)
5) Run the \`${globalArgs.prefix}cap\` command to synchronise the bot

FOR ALL USERS:
OPTIONAL - run the \`${globalArgs.prefix}edituser\` command to change user settings
1) Run the \`${globalArgs.prefix}enableme\` command in order to add yourself to the database
--------------------------------------------------------------------------------------------------------------------

For a setup guide of the groovy integration do \`${globalArgs.prefix}grooveguide\`
		`;
		message.channel.send(msg);
	},
};
