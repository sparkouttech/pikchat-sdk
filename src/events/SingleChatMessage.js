const CONSTANTS = require('../constants');
const { getSocketObj } = require('../EventHandler');
const events = require('../events');
const utils = require('../utils/index');

const SingleChatMessage = async (data) => {

    const { io, socket, models, message } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

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

    console.log(checkUser);
    if (checkUser == null) {
        /** receiver not connected to table */
        /**
         * Receiver is offline need to store the message on database
         */
         const Message = models[CONSTANTS.MESSAGE];
         const messageParams = {
             senderId : userId,
             receiverId : message.receiverId,
             messageType : message.messageType,
             message : message.message,
             messageStatus : 0,
             status : 0,
             sentAt : utils.getCurrentUtcDateTime()
         }
         await Message.create(messageParams);
         message.messageStatus = 0;
         socket.emit(events.SINGLE_CHAT_MESSAGE, message);
    } else {
        console.log(checkUser.isOnline);
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
            message.messageStatus = 1;
            socket.emit(events.SINGLE_CHAT_MESSAGE, message);
        } else {
            const Message = models[CONSTANTS.MESSAGE];
            const messageParams = {
                senderId : userId,
                receiverId : message.receiverId,
                messageType : message.messageType,
                message : message.message,
                messageStatus : 0,
                status : 0,
                sentAt : utils.getCurrentUtcDateTime()
            }
            await Message.create(messageParams);
            message.messageStatus = 0;
            socket.emit(events.SINGLE_CHAT_MESSAGE, message);
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