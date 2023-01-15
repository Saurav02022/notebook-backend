const jwt = require("jsonwebtoken");

const autenticate = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (err) {
        res.status(404).send({
          message: err.message,
          token: null,
        });
      } else {
        const { userId } = decoded;
        req.body.userId = userId;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
      token: null,
    });
  }
};

module.exports = {
  autenticate,
};
