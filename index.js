const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const uuid = require("uuid");
const express = require("express");
const socket = require("socket.io");
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

app.use(express.static("public"));

const server = app.listen(process.env.PORT, () => {
	console.log("Webserver Started on port " + process.env.PORT);
});

const io = socket(server);

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

const client = new Discord.Client();
client.commands = new Discord.Collection();

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

client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

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

client.login(process.env.BOT_TOKEN);
