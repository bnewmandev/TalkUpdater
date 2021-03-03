const mongoose = require("mongoose");

const schema = mongoose.Schema({
	userID: String,
	guildID: String,
	enabled: Boolean,
	avatarState: Number,
	avatarURL: String,
	nickname: String,
	nameCol: String,
});

module.exports = mongoose.model("UserModel", schema);
