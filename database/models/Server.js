const mongoose = require("mongoose");

const schema = mongoose.Schema({
	guildID: String,
	guildAlias: String,
	ownerTag: String,
	ownerID: String,
	isPremium: Boolean,
	joinedOn: Number,
	permanantCode: String,
	avatarCircle: Boolean,
});

module.exports = mongoose.model("ServerModel", schema);
