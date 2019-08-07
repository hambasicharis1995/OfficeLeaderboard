const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const port = 3000;
const path = require("path");
// routes
const authRouter = require("./routes/authRoute.js");
const gamesRouter = require("./routes/gamesRoute.js");
const employeesRouter = require("./routes/employeesRoute.js");
const statsRouter = require("./routes/statsRoute.js");

//handle parsingp
app.use(bodyParser.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../build")));
}
// app.use('/', express.static(path.join(__dirname, '/build')))

//
app.use("/api/auth", authRouter);
app.use("/api/games", gamesRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/stats", statsRouter);
app.get("/dashboard", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../index.html"));
});
//catch all for unknown routes
app.use((req, res) => res.sendStatus(404));

app.get("/*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

app.use((err, req, res, next) => {
  return res.status(500).send(err);
});

app.listen(port, err => {
  if (err) console.error("error when connecting to port", err);
  else console.log("connected on port", port);
});
