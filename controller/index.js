const {
  Contact,
  contactSchema,
  contactPutSchema,
  contactPatchSchema,
} = require("../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required fields",
      });
    }
    const contact = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.contactId);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error } = contactPutSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true,
      }
    );
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactPatchSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true,
      }
    );
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
  updateStatusContact,
};
