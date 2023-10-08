const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailFormat).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailFormat).required(),
});

const userPatchSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = mongoose.model("user", user);

module.exports = { User, registerSchema, loginSchema, userPatchSchema };
