const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (credentials = []) => {
  return (req, res, next) => {
    if (typeof credentials === "string") {
      credentials = [credentials];
    }
    //get token from header
    const token = req.headers["authorization"];
    if (!token) {
      // if there is no token
      return res.status(401).send("Access denied!");
    } else {
      const tokenBody = token.slice(7); //Cut Bearer + one empty space before token
      jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded) => {
        //verify
        if (err) {
          console.log(`JWT Error: ${err}`);
          return res.status(401).send("Error: Access Denied");
        }
        //No error!
        if (credentials.length > 0) {
          //check if credentials exist
          if (
            //check if credentials that we passed down is exist in token
            decoded.scopes &&
            decoded.scopes.length &&
            credentials.some((cred) => decoded.scopes.indexOf(cred) >= 0)
          ) {
            next();
          } else {
            return res.status(401).send("Error: Access Denied");
          }
        } else {
          next();
        }
      });
    }
  };
};
