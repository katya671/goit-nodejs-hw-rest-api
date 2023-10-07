const {
  User,
  registerSchema,
  loginSchema,
  userPatchSchema,
} = require("../models/user");
const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
require("dotenv").config();
const secret = process.env.SECRET;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Validation failed",
    });
  }

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email in use",
    });
  }
  try {
    const hashPassword = await bCrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.json({
      status: "success",
      code: 200,
      data: {
        email: newUser.email,
        subscripton: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Validation failed",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Email or password is wrong",
      });
    }
    const comparePassword = await bCrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Email or password is wrong",
      });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "24h" });
    user.token = token;
    user.save();

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({ message: "No Content" });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { error } = userPatchSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Invalid subscription value",
      });
    }

    const { subscription } = req.body;
    req.user.subscription = subscription;
    await req.user.save();

    res.json({
      status: "success",
      code: 200,
      data: {
        message: "Subscription updated successfully",
        email: req.user.email,
        subscription: req.user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
};
