
const CONSTANTS = require('../constants');
const events = require('../events');

/**
 * 
 * @param {*} data 
 */
const NewConnection = async (data) => {
    
    const { io, socket, models } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    // user management 
    const User = models[CONSTANTS.USER];
    const [user, userCreated] = await User.findOrCreate({
        where: {userId: userId},
        defaults: {
            userId: userId,
            isOnline: 'true'
        }
    });
    await User.update({ isOnline: "true", lastOnlineAt: null }, {
        where: {
            userId: userId
        }
    });

    // User session record management
    const userSession = models[CONSTANTS.USER_SESSION];
    const whereCondition = { sessionId: sessionId };
    const sessionParam = {
        sessionId: sessionId,
        socketId: socket.id,
        isOnline: 'true',
        userId: userId
    }
    const [session, sessionCreated] = await userSession.findOrCreate({
        where: whereCondition,
        defaults: sessionParam
    });
    if (sessionCreated) {
        console.log('session created newly');
    } else {
        await userSession.update({ socketId: socket.id,isOnline: "true", lastOnlineAt: null }, {
            where: {
                sessionId: sessionId,
                userId: userId
            }
        });
    }


    // broadcast online users to all clients
    const onlineUsers = await User.findAll({
        attributes: ['userId','isOnline','lastOnlineAt'],
    });
    // to all clients 
    io.emit(events.ONLINE_USERS, onlineUsers);


};
/**
 * 
 */
module.exports = NewConnection;