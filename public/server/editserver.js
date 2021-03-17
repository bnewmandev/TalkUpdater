const urlParams = new URLSearchParams(window.location.search);

const obj = {
	gid: urlParams.get("gid"),
	ref: urlParams.get("ref"),
};

document.getElementById("forcetextcolor").addEventListener("input", (e) => {
	const inputField = document.editserver.elements[4];
	if (e.target.checked) {
		inputField.disabled = false;
	} else {
		inputField.disabled = true;
	}
});

document.getElementById("forceaccentcolor").addEventListener("input", (e) => {
	const inputField = document.editserver.elements[6];
	if (e.target.checked) {
		inputField.disabled = false;
	} else {
		inputField.disabled = true;
	}
});

const init = async () => {
	const res = await axios.get(`/userlist?gid=${obj.gid}&ref=${obj.ref}`);
	const data = res.data;
	const elem = document.getElementById("userlist");
	const gid = document.createElement("input");
	gid.type = "hidden";
	gid.value = JSON.stringify(obj);
	gid.name = "metadata";
	elem.appendChild(gid);
	data.forEach((e) => {
		const label = document.createElement("label");
		label.htmlFor = e.id;
		label.innerText = e.username;
		elem.appendChild(label);

		const input = document.createElement("input");
		input.type = "text";
		input.name = "%---%" + e.id;
		input.placeholder = e.nickname;
		input.id = e.id;
		elem.appendChild(input);
	});
};

init();
