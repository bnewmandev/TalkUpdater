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
	var list = document.getElementById("main");
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

		var list = document.getElementById("main");
		list.appendChild(listItem);
	});
});
