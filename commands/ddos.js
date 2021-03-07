const Discord = require("discord.js");
const EventEmitter = require("events");
const events = require("events");
const ProgressBar = require("../lib/ProgressBar");

module.exports = {
	name: "ddos",
	description: "fake ddos",
	async execute(message, args, globalArgs) {
		const stageOneEmitter = new events.EventEmitter();

		// let clap = message.guild.emojis.cache.get(":clap: ");
		let target = [];
		if (args.length === 0) {
			target = ["those", "gosh", "darn", "stream", "snipers"];
		} else {
			target = args;
		}
		let newTarget = target.join(":clap: ");
		console.log(newTarget);
		// let t2 = await newTarget.split(" ").join(":clap: ");
		const getRandomIntInclusive = (min, max) => {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		let i = getRandomIntInclusive(8, 20);
		let bots = [];
		while (i > 0) {
			bots.push(getRandomIntInclusive(200, 800));
			i--;
		}

		const msg = [
			`opening secure socket to proxy server...\n`,
			`socket opened, opening connection to riot API...\n`,
			`connection successful. Spoofing access credentials to database\n`,
			`credentials accepted, searching for **${newTarget}**\n`,
			`target has been identified, locking in on IP\n`,
			`opening connection to botnet...\n`,
			`Computers responding to commands: ${bots.toString()}\n`,
			`Opening simultaneous connections to target IP...\n`,
			`EXECUTING DDOS SCRIPT\n-------------------------------------------\n`,
		];

		const newMg = await message.channel.send(
			"Command Accepted, initiating DDOS attack...\n\n"
		);

		// const createProgressBar = async () => {
		// 	const bar = "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░";
		// 	const fill = "██████████████████████████████████████████████████";
		// 	const codeMod = "";
		// 	const progress = await message.channel.send(
		// 		codeMod + bar + codeMod + "0%"
		// 	);
		// 	return {
		// 		currentBar: bar.split(),
		// 		emptyBar: bar,
		// 		fullBar: fill,
		// 		codeMod: codeMod,
		// 		fillChar: "█",
		// 		numFill: 0,
		// 		maxFill: bar.length,
		// 		barObj: progress,
		// 		returnBar: bar,
		// 	};
		// };

		const updateProgressBar = (bar) => {
			const percent = (bar.numFill / bar.maxFill) * 100;
			bar.returnBar = bar.currentBar.join("");
			bar.barObj.edit(bar.codeMod + bar.returnBar + " " + percent + "%");
		};

		const generateTimes = (iter, min, max) => {
			let t = 0;
			let j = 0;
			let times = [];
			while (j < iter) {
				let x = getRandomIntInclusive(min, max) + t;
				times.push(x);
				t = x;
				j++;
			}
			return times;
		};

		const runMessage = async (content, context) => {
			const times = generateTimes(content.length, 1000, 3000);
			let done = await content.forEach((elem, i) => {
				setTimeout(async () => {
					context.edit([context.content, elem]);
					stageOneEmitter.emit(i);
					stageOneEmitter.emit("UPDATE", i);
					console.log(i);
				}, times[i]);
			});
		};

		runMessage(msg, newMg);

		const stageOneHandler = () => {
			const embedMsg = new Discord.MessageEmbed()
				.setColor("#000000")
				.setTitle("DDOS SCRIPT RUNNING...")
				.setDescription("Currently running DDOS script")
				.setImage("https://i.imgur.com/cE0GwYT.gif")
				.setFooter("TARGET: 93.184.216.34");
			setTimeout(async () => {
				let NEWMSG = await message.channel.send(embedMsg);
				setTimeout(() => {
					const embedMsg2 = new Discord.MessageEmbed()
						.setColor("#000000")
						.setTitle("DDOS SCRIPT COMPLETED")
						.setDescription("Successfully added 2ms ping to target IP for 30s")
						.setFooter("TARGET IP: 93.184.216.34");
					NEWMSG.edit(embedMsg2);
				}, 10000);
			}, 3000);
		};

		let bar;

		let interval = null;

		stageOneEmitter.on(msg.length - 1, stageOneHandler);
		stageOneEmitter.on("UPDATE", (i) => {
			if (bar) {
				const progressBar = ProgressBar(i, 6, 100);
				bar.edit(progressBar);
			}
		});
		stageOneEmitter.on(
			1,
			async () => {
				const progressBar = ProgressBar(0, 6, 100);
				bar = await message.channel.send(progressBar);
			},
			500
		);

		stageOneEmitter.on("A" + 100, () => {
			clearInterval(interval);
		});
	},
};
