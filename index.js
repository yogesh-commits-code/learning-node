const logEvents = require("./logEvents");
const EventEmitter = require("events");

class Emitter extends EventEmitter {}

//intialse object
const myEmitter = new Emitter();

//add listener for the log events
myEmitter.on("log", (msg) => logEvents(msg));

myEmitter.emit("log", "log event emitted!\n");
