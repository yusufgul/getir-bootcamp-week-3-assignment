const jwt = require("jsonwebtoken");
const config = require("../config");

exports.getToken = (req, res) => {
  //get token
  const payload = {
    name: "Yusuf",
    scopes: ["customer:create", "customer:read"],
  };
  const token = jwt.sign(payload, config.JWT_SECRET);
  res.send(token);
};
