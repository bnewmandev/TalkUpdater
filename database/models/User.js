const mongoose = require("mongoose");

const schema = mongoose.Schema({
	userID: String,
	guildID: String,
	enabled: Boolean,
	avatarState: Number,
	avatarURL: String,
	nickname: String,
	nameCol: String,
	activeCol: String,
	refCode: String,
	username: String,
	forceName: String,
	twitchData: {
		state: String,
		isValid: Boolean,
		time: Number,
		username: String,
		code: String,
		authOn: Number,
		channels: [String],
		token: Object,
	},
});

module.exports = mongoose.model("UserModel", schema);
