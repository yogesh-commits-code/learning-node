const allowedOrigins = require('../config/allowedOrigins');
const corsOptions = require('../config/corsOptions');

const credentials = (req, res, next) => {
	if (allowedOrigins.includes(corsOptions)) {
		res.header('Access-Control-Access-Credentials', true);
	}
	next();
};

module.exports = credentials;
