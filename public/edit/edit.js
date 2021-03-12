const customImg = document.getElementById("customimage");
const nicknameToggle = document.getElementById("nicknametoggle");

customImg.addEventListener("input", (e) => {
	const inputField = document.editform.elements[3];
	if (e.target.checked) {
		inputField.disabled = false;
	} else {
		inputField.disabled = true;
	}
});

nicknameToggle.addEventListener("input", (e) => {
	const inputField = document.editform.elements[5];
	if (e.target.checked) {
		inputField.disabled = false;
	} else {
		inputField.disabled = true;
	}
});

const urlParams = new URLSearchParams(window.location.search);
const refCode = urlParams.get("ref");
if (refCode) {
	document.editform.elements[7].value = refCode;
}

const guID = urlParams.get("guid");
if (guID) {
	document.editform.elements[6].value = guID;
}
