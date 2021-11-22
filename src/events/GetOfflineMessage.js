const CONSTANTS = require('../constants');
const events = require('../events');
const utils = require('../utils/index');

/**
 * 
 * @param {*} data 
 */
const GetOfflineMessage = async (data) => {
    const { io, socket, models, message } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    const offlineMessage = models[CONSTANTS.OFFLINE_MESSAGE];

    const offMessages = await offlineMessage.findAll({
        attributes : ['senderId'],
        where: { receiverId: userId },
        group: ['senderId']
    });

    offMessages.forEach(element => {
        offlineMessage.count({
            where: {
                receiverId: userId,
                senderId: element.senderId
            }
          })
          .then(function(count) {
                offlineMessage.findOne({
                    where: {
                        receiverId: userId,
                        senderId: element.senderId
                    },
                    order: [
                        ['id', 'DESC']
                    ],
                })
                .then(function(msg) {
                    socket.emit(events.OFFLINE_MESSAGES, {senderId:element.senderId, messageCount: count, lastMessage: msg.message, messageAt: msg.messageTime});
                })
                .catch((err) => {
                    console.log('error', err);
                })
          });
    });    
};


module.exports = GetOfflineMessage;