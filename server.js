const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");

class Emitter extends EventEmitter {}

//intialse object
const myEmitter = new Emitter();

//add listener for the log events
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3000;
const serveFile = async (filePath, contentType, response) => {
	try {
		const data = await fsPromises.readFile(
			filePath,
			!contentType.includes("image") ? "utf8" : ""
		);
		response.writeHead(filePath.includes("404.html") ? 404 : 200, {
			"content-Type": contentType,
		});
		response.end(data);
	} catch (err) {
		console.log(err.message);
		response.statusCode = 500;
		myEmitter.emit("log", `${err.name}\t${err.message}\n`, "errLog.txt");
		response.end();
	}
};

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);
	myEmitter.emit("log", `${req.url}\t${req.method}\n`, "reqLog.txt");

	const extension = path.extname(req.url);

	let contentType;

	switch (extension) {
		case ".css":
			contentType = "text/css";
			break;
		case ".js":
			contentType = "text/javascript";
			break;
		case ".json":
			contentType = "application/json";
			break;
		case ".jpg":
			contentType = "image/jpeg";
			break;
		case ".png":
			contentType = "image/png";
			break;
		case ".txt":
			contentType = "text/plain";
			break;
		default:
			contentType = "text/html";
	}

	let filePath =
		contentType === "text/html" && req.url === "/"
			? path.join(__dirname, "views", "index.html")
			: contentType === "text/html" && req.url.slice(-1) === "/"
			? path.join(__dirname, "views", req.url, "index.html")
			: contentType === "text/html"
			? path.join(__dirname, "views", req.url)
			: path.join(__dirname, req.url);

	// makes the .html extnsion not required in the browser
	if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

	const fileExists = fs.existsSync(filePath);

	if (fileExists) {
		// serve the file
		serveFile(filePath, contentType, res);
	} else {
		//301
		//404

		switch (path.parse(filePath).base) {
			case "old-page.html":
				res.writeHead(301, { Location: "/new-page.html" });
				res.end();
				break;

			case "www-page.html":
				res.writeHead(301, { Location: "/" });
				res.end();
				break;

			default:
				serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
		}
	}
});
server.listen(PORT, () => console.log("Server is running on PORT : ", PORT));
