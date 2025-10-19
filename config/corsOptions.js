// cors - Cross Origin Resource Sharing
const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
	// checks for the request origin
	origin: (origin, callback) => {
		// remove the !origin after development
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('not allowed by CORS'));
		}
	},
	optionSuccessStatus: 200,
};

module.exports = corsOptions;
