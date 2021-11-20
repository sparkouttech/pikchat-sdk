const CONSTANTS = require('../constants');
const events = require('../events');
const utils = require('../utils/index');

/**
 * 
 * @param {*} data 
 */
const MessageRead = async (data) => {
    const { io, socket, models, message } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    const Message = models[CONSTANTS.MESSAGE];

    await Message.update({ readAt: utils.getCurrentUtcDateTime() }, {
        where: {
            id: message.id
        }
    });
};


module.exports = MessageRead;