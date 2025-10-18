const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
	const { user, password } = req.body;

	if (!user || !password) {
		return res
			.status(400)
			.json({ message: 'Username and password are required' });
	}

	const foundUsers = usersDB.users.find((person) => person.username === user);
	if (!foundUsers) return res.sendStatus(401); // unauthorized

	// evaluate password
	const match = await bcrypt.compare(password, foundUsers.password);
	if (match) {
		// create JWTs
		res.json({ success: `User ${user} is logged in !` });
	} else {
		res.sendStatus(401);
	}
};

module.exports = { handleLogin };
