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
	speakOnly: Boolean,
	refCode: String,
	textSize: Number,
	nameCol: String,
	activeCol: String,
	songInfo: Object,
	playlist: String,
});

module.exports = mongoose.model("ServerModel", schema);
