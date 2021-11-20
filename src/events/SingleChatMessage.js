const CONSTANTS = require('../constants');
const events = require('../events');
const utils = require('../utils/index');

const SingleChatMessage = async (data) => {

    const { io, socket, models, message } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    socket.emit(events.SINGLE_CHAT_MESSAGE, message);

    /** Models */
    const User = models[CONSTANTS.USER];
    const userSession = models[CONSTANTS.USER_SESSION];
    /** check receiver status on database */
    const checkUser = await User.findOne({
        attributes: ['isOnline'],
        where: {
            userId: message.receiverId
        }
    });

    if (checkUser == null) {
        /** receiver not connected to table */
        /**
         * Receiver is offline need to store the message on database
         */
        storeOfflineMessage(data);
    } else {
        if (checkUser.isOnline == 'true') {
            // user has active session
            const sessions = await userSession.findAll({
                attributes: ['socketId'],
                where: {
                    userId: message.receiverId,
                    isOnline: 'true'
                }
            });
            sessions.forEach(session => {
                // send message to all online session of receiver
                io.to(session.socketId).emit(events.SINGLE_CHAT_MESSAGE, message);
            });
    
            // TODO store in chat table 
            const Message = models[CONSTANTS.MESSAGE];
            const messageParams = {
                senderId : userId,
                receiverId : message.receiverId,
                messageType : message.messageType,
                message : message.message,
                messageStatus : 1,
                status : 1,
                sentAt : utils.getCurrentUtcDateTime()
            }
            await Message.create(messageParams);
        } else {
            /**
             * Receiver is offline need to store the message on database
             */
            storeOfflineMessage(data);
        }
    }

    
};


const storeOfflineMessage = async (data) => {

    const { io, socket, models, message } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;
    const offlineMessage = models[CONSTANTS.OFFLINE_MESSAGE];
    const messageParams = {
        senderId : userId,
        receiverId : message.receiverId,
        messageType : message.messageType,
        message : message.message,
        messageStatus : 1,
        status : 0,
        messageTime : utils.getCurrentUtcDateTime()
    }
    await offlineMessage.create(messageParams);
}

module.exports = SingleChatMessage;