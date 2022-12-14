const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/Schema");

const registrationController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = new User({ email, password });
    if (await User.findOne({ email })) {
      res.status(409).send({ message: "Email in use" });
    }
    await user.save();
    return res.status(201).json({ email: user.email });
  } catch {
    res.status(400).json({ message: `Validation error` });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: `Email ${email} is wrong` });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Password is wrong" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      token,
      email: user.email,
    });
  } catch {
    res.status(400).json({ message: `Validation error` });
  }
};
const logoutControlls = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { token: null },
    {
      new: true,
    }
  );
  return res.status(204).json("No Content");
};

const currentControlls = async (req, res, next) => {
  const userId = req.user;

  await User.findById(userId);
  if (userId) {
    const { email } = userId;
    return res.status(200).json({ email });
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutControlls,
  currentControlls,
};
