const fs = require("fs");
const uuid = require("uuid");
const rs = fs.createReadStream("./newReply.txt", { encoding: "utf8" });

const ws = fs.createWriteStream("./reply.txt");

/* rs.on("data", (dataChunk) => {
	ws.write(dataChunk);
});
 */
rs.pipe(ws);
uuid();
