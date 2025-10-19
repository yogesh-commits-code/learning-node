const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
	if (allowedOrigins.includes(origin)) {
		res.header('Access-Control-Access-Credentials', true);
	}
	next();
};

module.exports = credentials;
