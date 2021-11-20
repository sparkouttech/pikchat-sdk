const CONSTANTS = require('../constants');
const events = require('../events');
const utils = require('../utils/index');

/**
 * 
 * @param {*} data 
 */
const MessageDelivered = async (data) => {
    const { io, socket, models, message } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    const Message = models[CONSTANTS.MESSAGE];

    await Message.update({ deliveredAt: utils.getCurrentUtcDateTime() }, {
        where: {
            id: message.id
        }
    });
};


module.exports = MessageDelivered;