const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
});

const contactPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const contactPatchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = mongoose.model("contact", contact);

module.exports = {
  Contact,
  contactSchema,
  contactPutSchema,
  contactPatchSchema,
};
