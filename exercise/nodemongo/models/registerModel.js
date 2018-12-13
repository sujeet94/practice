const mongoose = require('mongoose');
const Joi = require('joi');

const registerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    number: { type: Number, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("user", registerSchema)

function validateUser(userData) {
    const schema = Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().optional().allow(''),
        number: Joi.string().required().min(10).max(13),
        password: Joi.string()
    });
    return Joi.validate(userData, schema)
}

exports.UserModel = User;
exports.validateUser = validateUser;
