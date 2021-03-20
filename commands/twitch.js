const Discord = require("discord.js");
const fs = require("fs");
const uuid = require("uuid");
const tmi = require("tmi.js");
const getToken = require("../lib/twitch/getToken");
const socket = require("socket.io");
const axios = require("axios");

module.exports = {
	name: "twitch",
	description: "twitch integration",
	async execute(message, args, globalArgs) {
		// Imports from globalArgs
		const UserModel = globalArgs.UserModel;
		const ServerModel = globalArgs.ServerModel;
		const roleName = globalArgs.roleName;

		// Checking for permissions
		let l1 = message.member.roles.cache.some((role) => role.name === roleName);
		if (!l1) {
			return message.reply(
				"You don't have permission to perform this command, you need the role '" +
					roleName +
					"'"
			);
		}

		// Checking for connection to voice channel
		let vc = message.guild.me.voice.channel;
		let vc2 = message.member.voice.channel;
		if (!vc2) return message.reply("Plese join a voice channel");
		if (!vc) return message.reply("Please connect me to a voice channel");

		const user = await UserModel.findOne({
			userID: message.member.user.id,
			guildID: message.guild.id,
		});

		if (!user) {
			return message.reply("Your account has not been enabled");
		}

		if (!user.twitchData.code) {
			return message.reply("Your twitch account is not connected");
		}
		const opts = {
			identity: {
				username: process.env.TTVBOTUSR,
				password: process.env.TTVTOKEN,
			},
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [user.twitchData.token.info["preferred_username"]],
		};
		const client = new tmi.client(opts);
		client.on("connected", (e) => {
			console.log(e);
			message.channel.send(
				"Successfully Synchronised with " +
					user.twitchData.token.info["preferred_username"] +
					"'s twitch stream"
			);
		});

		client.on("disconnected", () => {
			message.channel.send(
				user.twitchData.token.info["preferred_username"] +
					"'s bot has disconnected"
			);
		});
		client.connect();

		const onMessageHandler = async (target, context, msg, self) => {
			if (self) return;
			const commandName = msg.trim();
			const server = await ServerModel.findOne({ guildID: message.guild.id });
			switch (commandName) {
				case "!song":
					if (!server.songInfo) {
						return client.say(
							target,
							`@${tags.username} No Song is currently playing`
						);
					}
					await client.say(
						target,
						`@${tags.username} Song: ${server.songInfo.name}`
					);
					await client.say(
						target,
						`@${tags.username} Link: ${server.songInfo.link}`
					);
					break;
				case "!playlist":
					if (!server.playlist) {
						client.say(target, "There is no queued playlist");
					}
					await client.say(target, `Playlist: ${server.playlist}`);
				default:
					break;
			}
		};

		client.on("message", onMessageHandler);
	},
};
