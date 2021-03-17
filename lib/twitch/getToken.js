const axios = require("axios");

const getToken = async (code) => {
	let data = {};
	const clientID = "p5pnijeqb5stamtxhwo71mg4ys0221";
	const urlToken = `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${process.env.TTVSECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.ADDRESS}/twitch/getid`;
	const token = await axios.post(urlToken);
	data["token"] = token.data;
	const urlUser = `https://id.twitch.tv/oauth2/userinfo`;
	try {
		const res2 = await axios.get(urlUser, {
			headers: {
				Authorization: `Bearer ${token.data.access_token}`,
			},
		});
		data["info"] = res2.data;
		return data;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = getToken;
