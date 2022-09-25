const jwt = require("jsonwebtoken");
const { User } = require("../db/Schema");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  const [tokenType, token] = req.headers.authorization.split(" ");
  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  try {
    const user = jwt.decode(token, process.env.SECRET);
    const userEl = await User.findOne({ _id: user._id });
    req.userId = user._id;
    req.user = userEl;

    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { authMiddleware };
