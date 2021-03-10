var socket = io.connect();
let online = null;
let userList = [];
let speakOnly = false;
let usrCol = {};

socket.on("update", (msg) => {
	if (msg.guid === online) {
		if (userList.includes(msg.id)) {
			if (msg.speaking === true) {
				console.log(msg.id + " speaking");
				const user = document.getElementById(msg.id);
				if (speakOnly) {
					const li = document.getElementById("LI" + msg.id);
					li.style.display = "flex";
				} else {
					const li = document.getElementById("LI" + msg.id);
					li.style.display = "flex";
				}
				user.style.border = `8px solid ${usrCol[msg.id]}`;
			} else {
				const user = document.getElementById(msg.id);
				if (speakOnly) {
					const li = document.getElementById("LI" + msg.id);
					li.style.display = "none";
				} else {
					const li = document.getElementById("LI" + msg.id);
					li.style.display = "flex";
				}
				user.style.border = "8px solid black";
				console.log(msg.id + " not speaking");
			}
		}
	}
});

socket.on("users", (data) => {
	if (data.speakOnly) {
		speakOnly = true;
	}
	const user = data.data;
	const gid = data.gid;
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const param1 = urlParams.get("id");

	if (gid !== param1) return;
	online = data.guid;
	console.log(user);
	var list = document.getElementById("mainL");
	list.innerHTML = "";

	user.forEach((user) => {
		userList.push(user.id);
		usrCol[user.id] = user.activeCol;
		const listItem = document.createElement("li");
		const image = document.createElement("img");
		if (speakOnly) {
			listItem.style.display = "none";
		}
		image.setAttribute("src", user.avatar);
		image.setAttribute("alt", user.name);
		image.style.border = "8px solid black";
		if (data.circle) {
			image.style.borderRadius = "50%";
		} else {
			image.style.borderRadius = "0";
		}
		image.id = user.id;
		listItem.id = "LI" + user.id;
		listItem.appendChild(image);

		const name = document.createElement("p");
		name.innerText = user.name;
		name.className = "TEXT";
		name.style.color = user.nameCol;
		listItem.appendChild(name);

		var list = document.getElementById("mainL");
		list.appendChild(listItem);
	});
});

socket.on("flip", () => {
	console.log("flipped");
	const main = document.getElementById("mainL");
	if (main.style.float == "right") {
		main.style.float = "left";
	} else {
		main.style.float = "right";
	}
});

socket.on("refresh", (data) => {
	if (data.gid === online) {
		window.location.reload();
	}
});

socket.on("TEXTSIZE", (data) => {
	const all = document.getElementsByClassName("TEXT");
	for (let elem of all) {
		console.log(elem);
		elem.style.fontSize = data.toString() + "px";
		console.log(elem.style.fontSize);
	}
});

socket.on("NOWPLAYING", (data) => {
	const elem = document.getElementById("nowPlay");
	elem.innerText = data.sng;
});

const test = () => {
	const listItem = document.createElement("li");

	const image = document.createElement("img");
	image.setAttribute(
		"src",
		"https://cdn.discordapp.com/avatars/231427823275868160/8b6208e57a4cb0b7a257c74eacf7dbdd.webp"
	);
	image.setAttribute("alt", "jam1nb3n");
	image.id = 12;
	listItem.appendChild(image);

	const name = document.createElement("p");
	name.innerText = "jam1nb3n";
	listItem.appendChild(name);

	var list = document.getElementById("mainL");
	list.appendChild(listItem);
};
