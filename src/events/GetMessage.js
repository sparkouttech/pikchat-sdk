const CONSTANTS = require('../constants');
const events = require('../events');
const utils = require('../utils/index');

/**
 * 
 * @param {*} data 
 */
const GetMessage = async (data) => {
    const { io, socket, models, message } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    let { offset, limit, senderId } = message;

    const Message = models[CONSTANTS.MESSAGE];

    const messages = await Message.findAndCountAll({
        where: {receiverId: userId, senderId: senderId},
        order: [
            ['id', 'DESC']
        ],
        limit: limit,
        offset: offset,
    });

    socket.emit(events.GET_MESSAGES, messages);
    
};


module.exports = GetMessage;

