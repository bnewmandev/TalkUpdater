const mongoose = require("mongoose");

const schema = mongoose.Schema({
	guildID: String,
	guildAlias: String,
	ownerTag: String,
	ownerID: String,
	isPremium: Boolean,
	joinedOn: Number,
	permanantCode: String,
});

module.exports = mongoose.model("ServerModel", schema);
