module.exports = {
	name: "source",
	description: "displays command list",
	execute(message, args, globalArgs) {
		const msg = "https://github.com/jam1nb3n/TalkUpdater";
		message.channel.send(msg);
	},
};
