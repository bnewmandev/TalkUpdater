var socket = io.connect();
let online = null;
let userList = [];
let speakOnly = false;
let usrCol = {};

socket.on("groovy", () => {
	console.log("GROOOVI");
	if (document.getElementById("bot").style.display === "initial") {
		document.getElementById("bot").style.display = "none";
	} else {
		document.getElementById("bot").style.display = "initial";
	}
});

socket.on("refresh", (data) => {
	if (data.gid === online) {
		window.location.reload();
	}
});

socket.on("NOWPLAYING", (data) => {
	const elem = document.getElementById("nowPlay");
	elem.innerText = data.sng;
});
