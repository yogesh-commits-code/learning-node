const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const cors = require('cors');
const PORT = process.env.PORT || 3000;

// custom middleware
app.use(logger);

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
app.use(cors(corsOptions));

// bulit -in middleware to handle urlencoded data
// in other words, form data:
// 'content-type : application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// bulit-in middleware for json
app.use(express.json());

// serve static file
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	next();
});

app.use('/', require('./routes/root'));
app.use('/subDir', require('./routes/subDir'));
app.use('/employees', require('./routes/api/employees'));

// for all req
app.all(/\*/, (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({ error: '404 page not found ' });
	} else {
		res.type('txt').send('404 not found');
	}
});

app.use(errorHandler);

app.listen(PORT, () => console.log('Server is running on PORT : ', PORT));
