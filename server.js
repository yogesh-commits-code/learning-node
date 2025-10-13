const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	next();
});
app.get(/\/index(.html)?/, (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get(
	'/hello.html',
	(req, res, next) => {
		console.log('Attempted to show!');
		next();
	},
	(req, res) => {
		res.send('Hello, World');
	}
);
let one = (req, res, next) => {
	console.log('One');
	next();
};

let two = (req, res, next) => {
	console.log('two');
	next();
};

let three = (req, res) => {
	console.log('Three');
	res.send('Finished');
};
app.get(/\/chain(.html)?/, [one, two, three]);
app.get('/old-page.html', (req, res) => {
	res.redirect(301, '/new-page.html'); // 302 by default
});

app.get(/\*/, (req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log('Server is running on PORT : ', PORT));
