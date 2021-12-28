const CONSTANTS = require('../constants');
const events = require('../events');
const utils = require('../utils/index');
const { Op } = require("sequelize");

/**
 * 
 * @param {*} data 
 */
const GetLastMessage = async (data) => {
    //
    const { io, socket, models, message } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    let { senderId } = message;

    const Message = models[CONSTANTS.MESSAGE];

    const messages = await Message.findAndCountAll({
        where: {
            [Op.or]: [{
                [Op.and]: [
                    {receiverId: userId, senderId: senderId}
                ]},
                {
                    [Op.and]: [
                        {receiverId: senderId, senderId: userId}
                    ]
                }
            ]
        },
        order: [
            ['id', 'DESC']
        ],
        limit: 1,
        offset: 0,
    });

    socket.emit(events.GET_LAST_MESSAGE, {senderId:senderId, messages:messages});
    
};


module.exports = GetLastMessage;
