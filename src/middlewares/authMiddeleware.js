const jwt = require("jsonwebtoken");
const { User } = require("../db/Schema");

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    if (!token) {
      {
        next(
          res.status(401).json({
            message: "Please, provide a token",
          })
        );
      }
    }
    const decodeJwt = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodeJwt._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizeError("Not authorized"));
  }
};

module.exports = { authMiddleware };
