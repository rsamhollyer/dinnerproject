require("dotenv").config();

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const es6Renderer = require("express-es6-template-engine");

const session = require("express-session"); // keeps track of unique users visiting the site
const FileStore = require("session-file-store")(session); // keep the session info in files on the server

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOST = "0.0.0.0";

const logger = morgan("tiny");

const {
	homeRouter,
	userRouter,
	dinnerRouter,
	memberRouter,
} = require("./routers");
const { requireLogin } = require("./auth");

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");
app.use(logger);

app.use(
	session({
		store: new FileStore(), // store in files on the server
		secret: process.env.SESSION_SECRET, // the secret is like a 2-way encryption key
		saveUninitialized: false, // Chris does not know what this does. Or the next two
		resave: true,
		rolling: true,
		cookie: {
			// "magic band"
			maxAge: 1000 * 60 * 60 * 24 * 7, // how miliseconds until it expires, 1 week
		},
	})
);
app.use(express.urlencoded({ extended: true }));

app.use(homeRouter);
app.get("/unauthorized", (req, res) => {
	console.log("----- so sad...not logged in ----");
	res.send(`You shall not pass!`);
});

app.use("/user", userRouter);
app.use(requireLogin);

app.use("/dinners", dinnerRouter);
app.use("/members-only", memberRouter);

server.listen(PORT, HOST, () => {
	console.log(`Listening at http://${HOST}:${PORT}`);
});
