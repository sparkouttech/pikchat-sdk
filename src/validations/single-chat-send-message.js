const Joi = require('joi');

const SingleChatMessageValidationSchema = Joi.object({
    senderId: Joi.string().required().label("Sender id"),
    receiverId: Joi.string().required(),
    messageType: Joi.number()
        .integer()
        .min(1)
        .max(20).required(),
    message: Joi.string().required(),
});

module.exports = SingleChatMessageValidationSchema;
