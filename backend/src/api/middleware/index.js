const { authSecret } = require("../../config");
const jwt = require("jwt-simple");

module.exports = {
  async verifyJWT(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ status: 401, message: "No token provided." });
    }

    if (!authorization.match(/^Bearer\s+/)) {
      return res
        .status(400)
        .json({ status: 400, message: "No Bearer token provided." });
    }

    try {
      const [, token] = authorization.split(" ");
      const decodedToken = jwt.decode(token, authSecret);

      req.userInfo = { ...decodedToken };
      next();
    } catch (err) {
      return res
        .status(500)
        .json({ status: 500, message: "Token authentication failed" });
    }
  },
};
