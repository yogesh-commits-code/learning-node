// importing common core modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// code

const logEvents = async (message) => {
	const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}`;
	console.log(logItem);

	try {
		if (!fs.existsSync(path.join(__dirname, "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "logs"));
		}
		await fsPromises.appendFile(
			path.join(__dirname, "logs", "eventLog.txt"),
			logItem
		);
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = logEvents;

/* console.log(format(new Date(), "yyyy-MM-dd\tHH:mm:ss"));
console.log(uuid());
 */
