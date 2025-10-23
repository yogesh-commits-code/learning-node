const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const { user, password } = req.body;
	if (!user || !password)
		return res
			.status(400)
			.json({ message: 'Username or Password are required' });

	// check for duplicate username in database
	const duplicate = await User.findOne({ username: user }).exec();
	if (duplicate) return res.sendStatus(409); // '409' -> Conflict
	try {
		//encrypt password
		const hashedPwd = await bcrypt.hash(password, 10);
		//Create and store new user
		const result = await User.create({
			username: user,
			password: hashedPwd,
		});

		console.log(result);

		res.status(201).json({ success: `New user ${user} created` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { handleNewUser };
