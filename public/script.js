var socket = io.connect();

socket.on("update", (msg) => {
	console.log(msg);
	if (msg.speaking === true) {
		console.log("speaking");
		const user = document.getElementById(msg.id);
		user.style.border = "5px solid red";
	} else {
		const user = document.getElementById(msg.id);
		user.style.border = "5px solid black";
	}
});

socket.on("users", (user) => {
	var list = document.getElementById("mainL");
	list.innerHTML = "";
	user.forEach((user) => {
		const listItem = document.createElement("li");

		const image = document.createElement("img");
		image.setAttribute("src", user.avatar);
		image.setAttribute("alt", user.name);
		image.id = user.id;
		listItem.appendChild(image);

		const name = document.createElement("p");
		name.innerText = user.name;
		listItem.appendChild(name);

		var list = document.getElementById("mainL");
		list.appendChild(listItem);
	});
});

socket.on("flip", () => {
	console.log("yeet");
	const main = document.getElementById("mainL");
	if (main.style.float == "right") {
		main.style.float = "left";
	} else {
		main.style.float = "right";
	}
});

socket.on("refresh", () => {
	window.location.reload();
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
