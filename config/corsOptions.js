// cors - Cross Origin Resource Sharing
const whiteList = [
	'https://www.yoursite.com',
	'http://127.0.0.1:5500',
	'http://localhost:3000',
];
const corsOptions = {
	// checks for the request origin
	origin: (origin, callback) => {
		// remove the !origin after development
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('not allowed by CORS'));
		}
	},
	optionSuccessStatus: 200,
};

module.exports = corsOptions;
