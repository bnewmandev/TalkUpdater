const isPremium = (ServerModel, message) => {
	const promise = new Promise(async (res, rej) => {
		const server = await ServerModel.findOne({ guildID: message.guild.id });
		if (!server) {
			rej(Error("Server not initialised"));
		}
		if (server.isPremium) {
			res("Server is premium");
		} else {
			rej(Error("Server not premium, contact jam1nb3n#1440"));
		}
	});
	return promise;
};

module.exports = isPremium;
