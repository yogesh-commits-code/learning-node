const User = require('../model/User');

const handleLogout = async (req, res) => {
	// on Client, delete accessToken

	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res
			.sendStatus(204) // No Content
			.json({ message: 'Cookies do not exist' });
	}

	const refreshToken = cookies.jwt;

	// Is refresh token in db?

	const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true });
		return res.sendStatus(204); // No content
	}

	// Delete refresh token in the db ?
	foundUser.refreshToken = '';
	const result = await foundUser.save();
	console.log(result);

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
	res.sendStatus(204);
};

module.exports = { handleLogout };
