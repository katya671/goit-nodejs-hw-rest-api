const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();
const secret = process.env.SECRET;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized: Token is missing",
      });
    }

    const { id } = jwt.verify(token, secret);
    const user = await User.findById(id);

    if (!user || token !== user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized: Invalid Token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = { authenticate };
