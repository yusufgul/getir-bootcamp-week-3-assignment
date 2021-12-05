const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const appLogStream = fs.createWriteStream(path.join(__dirname, "app.log"), {
  flags: "a",
});
const { toUSVString } = require("util");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRoutes");
const app = express();
const router = express.Router(); //TODO düzelt
const checkJwt = require("./auth");

//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: appLogStream }));
app.get("/", (req, res) => {
  res.send("foo");
});

router.post("/login", function (req, res, next) {
  const { email } = req.body;
  const token = jwt.sign(
    {
      email: email,
      name: "Yusuf",
      exp: Math.floor(Date.now() / 1000) + 60,
      issuer: "www.issuer.com",
    },
    "secretKey"
  );
  res.send(token);
});

router.post("/posts", checkJwt, function (req, res, next) {
  //TODO taşı
  return res.status(200).send({
    message: "permission granted",
    status: "success",
  });
});

//ROUTE
app.use("/", router);
app.use("/api/v1/books", bookRouter);

module.exports = app;
