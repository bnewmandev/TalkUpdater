const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const uuid = require("uuid");
const express = require("express");
const socket = require("socket.io");
const events = require("events");
const { createCanvas } = require("canvas");
const ProgressBar = require("./lib/ProgressBar");
const isPremium = require("./lib/isPremium");
let currentlyPlaying = "";

const app = express();

const ServerModel = require("./database/models/Server");
const UserModel = require("./database/models/User");

const { prefix, roleName } = require("./config.json");

require("dotenv").config();

mongoose.connect(process.env.CON_STR, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.static("public"));

const server = app.listen(process.env.PORT, () => {
	console.log("Webserver Started on port " + process.env.PORT);
});

const io = socket(server);

const client = new Discord.Client();
client.commands = new Discord.Collection();

const globalArgs = {
	io: io,
	prefix: prefix,
	ServerModel: ServerModel,
	UserModel: UserModel,
	roleName: roleName,
};

io.on("connection", (socket) => {
	console.log("Socket opened");
});

const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once("ready", () => {
	console.log("Ready!");
	client.user
		.setActivity(`${prefix}help || pogging`, { type: "LISTENING" })
		.then((presence) =>
			console.log(`Activity set to ${presence.activities[0].name}`)
		)
		.catch(console.error);
});

client.on("message", async (message) => {
	if (message.author.id === "234395307759108106" && message.embeds) {
		if (message.embeds[0].title === "Now playing") {
			const ini = message.embeds[0].description.indexOf("[");
			const fin = message.embeds[0].description.indexOf("]");
			currentlyPlaying = message.embeds[0].description.substr(
				ini + 1,
				fin - ini - 1
			);
			io.emit("NOWPLAYING", { sng: currentlyPlaying });
		}
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!message.guild.me.hasPermission("ADMINISTRATOR"))
		return message.reply("I need Administrator permissions!");
	try {
		client.commands.get(command).execute(message, args, globalArgs);
	} catch (error) {
		message.reply("This command does not exist or was used incorrectly");
	}
});
client.on("guildMemberSpeaking", (member, speaking) => {
	if (member.user.bot) return;
	if (speaking.bitfield) {
		// console.log(member.user.username + " Has started speaking");
		io.emit("update", {
			speaking: true,
			id: member.user.id,
			guid: member.guild.id,
		});
	} else {
		// console.log(member.user.username + " Has stopped speaking");
		io.emit("update", {
			speaking: false,
			id: member.user.id,
			guid: member.guild.id,
		});
	}
});

app.post("/editform", async (req, res) => {
	const params = req.body;
	const ID = params.GUID.split(":");
	const userC1 = await UserModel.findOne({ guildID: ID[0], userID: ID[1] });
	if (!userC1) {
		return res.send("ERROR, GUID NOT VALID");
	}
	const userC2 = await UserModel.findOne({ refCode: params.refCode });
	if (userC1 === userC2) {
		return res.send("ERROR, INVALID REFERENCE CODE");
	}
	let imageState = 0;
	let avatarURL;
	if (params.customimage === "on") {
		imageState = 2;
	}
	if (params.imagelink) {
		avatarURL = params.imagelink;
		imageState = 1;
	}
	const userUpdate = await UserModel.findOneAndUpdate(
		{ guildID: ID[0], userID: ID[1] },
		{
			activeCol: params.activecol,
			nameCol: params.namecol,
			nickname: params.nickname || null,
			avatarState: imageState,
			avatarURL: avatarURL || null,
		}
	);
	res.send("SUCCESS");
});

app.get("/userlist", async (req, res) => {
	const params = req.query;
	const users = await UserModel.find({ guildID: params.gid });
	let sendData = [];
	users.forEach((elem) => {
		const user = {
			id: elem.userID,
			username: elem.username,
			nickname: elem.nickname || "Nickname Not Currently Set",
		};
		sendData.push(user);
	});
	res.json(sendData);
});

app.post("/editserver", async (req, res) => {
	const params = req.body;
	params.metadata = JSON.parse(params.metadata);
	let nicknames = {};
	for (const key in params) {
		if (key.startsWith("%---%")) {
			nicknames[key.substring(5)] = params[key];
			delete params[key];
		}
	}
	params["nicknames"] = nicknames;
	const server = await ServerModel.findOne({
		refCode: params.metadata.ref,
		guildID: params.metadata.gid,
	});
	if (!server) {
		return res.send("UNKNOWN FAILURE");
	}
	let cAvatar = false;
	if (params.circleavatar === "on") {
		cAvatar = true;
	}
	let tOnly = false;
	if (params.talkonly === "on") {
		tOnly = true;
	}
	const updateServer = await ServerModel.findOneAndUpdate(
		{
			refCode: params.metadata.ref,
			guildID: params.metadata.gid,
		},
		{
			avatarCircle: cAvatar,
			textSize: parseInt(params.textsize),
			speakOnly: tOnly,
			nameCol: params.textcolor || null,
			activeCol: params.accentcolor || null,
		}
	);
	for (const key in nicknames) {
		console.log({ userID: key, guildID: params.metadata.gid });
		const usrUpdate = await UserModel.findOneAndUpdate(
			{
				userID: key,
				guildID: params.metadata.gid,
			},
			{
				forceName: nicknames[key],
			}
		);
	}
	params.msg = "SUCCESS, SERVER SETTINGS UPDATED";
	const server2 = await ServerModel.findOne({
		refCode: params.metadata.ref,
		guildID: params.metadata.gid,
	});
	params.serverDetails = server2;
	res.json(params);
});

client.login(process.env.BOT_TOKEN);
