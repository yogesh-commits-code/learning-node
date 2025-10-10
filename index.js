const fsPromise = require("fs").promises;
const path = require("path");

const fileOps = async () => {
	try {
		const data = await fsPromise.readFile(path.join("starter.txt"), "utf8");
		console.log(data);
		await fsPromise.unlink(path.join("starter.txt"));
		await fsPromise.writeFile(path.join("reply.txt"), data);
		await fsPromise.appendFile(path.join("reply.txt"), data);
		await fsPromise.rename(path.join("reply.txt"), path.join("newReply.txt"));
		const newData = await fsPromise.readFile(path.join("newReply.txt"), "utf8");
		console.log(newData);
	} catch (err) {
		console.log(err.message);
	}
};
fileOps();

/* fs.readFile(path.join("starter.txt"), "utf8", (err, data) => {
	if (err) throw err;
	console.log(data);
});

fs.writeFile(path.join("reply.txt"), "hello this is reply.", (err) => {
	if (err) throw err;
	console.log("write complete");

	fs.appendFile(path.join("reply.txt"), "\n\nok", (err) => {
		if (err) throw err;
		console.log("append complete");

		fs.rename(path.join("reply.txt"), path.join("newReply.txt"), (err) => {
			if (err) throw err;
			console.log("rename complete");
		});
	});
});

process.on("uncaughtException", (err) => {
	console.error(`There was an uncaught error: ${err}`);
	process.exit(1);
});
 */
