const express = require("express");
const authorize = require("./middlewares/authorization-middleware");
const bookRouter = require("./routes/bookRoutes");
const tokenRouter = require("./routes/tokenRoutes");
const app = express();
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
//create a logfile
const appLogStream = fs.createWriteStream(path.join(__dirname, "app.log"), {
  flags: "a",
});

//MIDDLEWARES
app.use(express.json());
app.use(morgan("combined", { stream: appLogStream }));

//ROUTE
//for token
app.use("/api/v1/token", tokenRouter);
//for books
app.use("/api/v1/books", authorize("customer:read"), bookRouter);

module.exports = app;
