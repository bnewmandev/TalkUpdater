const Discord = require("discord.js");
const fs = require("fs");

const express = require("express");
const socket = require("socket.io");
const app = express();

const { prefix } = require("./config.json");

require("dotenv").config();

app.use(express.static("public"));

const server = app.listen(process.env.PORT, () => {
	console.log("Webserver Started on port " + process.env.PORT);
});

const io = socket(server);

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
		.setActivity(">help || pogging", { type: "LISTENING" })
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
		client.commands.get(command).execute(message, args, io, client);
	} catch (error) {
		message.reply("This command does not exist or was used incorrectly");
	}
});
client.on("guildMemberSpeaking", (member, speaking) => {
	if (member.user.bot) return;
	if (speaking.bitfield) {
		// console.log(member.user.username + " Has started speaking");
		io.emit("update", { speaking: true, id: member.user.id });
	} else {
		// console.log(member.user.username + " Has stopped speaking");
		io.emit("update", { speaking: false, id: member.user.id });
	}
});

client.login(process.env.BOT_TOKEN);
