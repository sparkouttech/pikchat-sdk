

const CONSTANTS = require('../constants');
const utils = require('../utils/index');
const { Op } = require("sequelize");
const events = require('../events');

/**
 * 
 * @param {*} data 
 */
const disconnect = async (data) => {
    const { io, socket, models } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    // User session record management
    const userSession = models[CONSTANTS.USER_SESSION];

    await userSession.findOne({
        where: {
        isOnline: "true",
        userId: userId,
        socketId: {
            [Op.not]: socket.id
        },
        sessionId: {
            [Op.not]: sessionId
        }
    }}).then(data => {
        console.log('Inside usersession findone');
        if (!data) {
            updateUserOffline(models, userId);
        }
    })
    .catch(err => {
        console.log('Error :', err);
    });

    await userSession.update({ isOnline: "false", lastOnlineAt: utils.getCurrentUtcDateTime() }, {
        where: {
            socketId: socket.id
        }
    });

    const User = models[CONSTANTS.USER];
    // broadcast online users to all clients
    const onlineUsers = await User.findAll({
        attributes: ['userId','isOnline','lastOnlineAt'],
    });
    // to all clients 
    io.emit(events.ONLINE_USERS, onlineUsers);
};

/**
 * 
 * @param {*} models 
 * @param {*} userId 
 */
const updateUserOffline = async (models, userId) => {
    const User = models[CONSTANTS.USER];
    await User.update({ isOnline: "false", lastOnlineAt: utils.getCurrentUtcDateTime() }, {
        where: {
            userId: userId
        }
    });
};


module.exports = disconnect;