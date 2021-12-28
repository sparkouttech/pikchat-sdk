const CONSTANTS = require('../constants');
const events = require('../events');
const utils = require('../utils/index');

/**
 * 
 * @param {*} data 
 */
const TypingEvent = async (data) => {
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
    if (checkUser != null && checkUser.isOnline == 'true') {
        // receiver is online
        const sessions = await userSession.findAll({
            attributes: ['socketId'],
            where: {
                userId: message.receiverId,
                isOnline: 'true'
            }
        });
        sessions.forEach(session => {
            // send message to all online session of receiver
            io.to(session.socketId).emit(events.TYPING, message);
        });
    }
};


module.exports = TypingEvent;