const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "quick",
	description: "quickstart",
	async execute(message, args, globalArgs) {
		const commands = globalArgs.commands;
		let msg;
		const stepOne = async () => {
			message.channel.send("Quickstart Initiating...");
			commands.get("connect").execute(message, args, globalArgs);
			setTimeout(() => {
				setTimeout(() => {
					stepTwo();
				}, 500);
				commands.get("groovelink").execute(message, args, globalArgs);
			}, 250);
		};
		const stepTwo = async () => {
			msg = await message.channel.send(
				"Please react to this message with 👍 when you have opened/refreshed the browser sources"
			);
			msg.react("👍").then((r) => {
				msg.react("👎");
			});

			const filter = (reaction, user) => {
				return (
					["👍", "👎"].includes(reaction.emoji.name) &&
					user.id === message.author.id
				);
			};

			msg
				.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
				.then((collected) => {
					const reaction = collected.first();

					if (reaction.emoji.name === "👍") {
						stepThree();
					} else {
						message.reply("Operation Cancelled");
					}
				})
				.catch((collected) => {
					message.reply("No Response after 60 seconds, exiting");
				});
		};
		const stepThree = () => {
			commands.get("capture").execute(message, args, globalArgs);
			commands.get("groovecapture").execute(message, args, globalArgs);
			commands.get("twitch").execute(message, args, globalArgs);
			message.channel.send(
				`Success!, run \`${globalArgs.prefix}reload\` to reload the overlays`
			);
		};
		stepOne();
	},
};
