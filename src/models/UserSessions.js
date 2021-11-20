
const Sequelize = require('sequelize');

const UserSessionModel = (sequelize) => {
    const UserSession = sequelize.define('pikchat_user_sessions', {
        // Model attributes are defined here
        userId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        socketId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sessionId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isOnline: {
            type: Sequelize.STRING
        },
        lastOnlineAt : {
            type: Sequelize.STRING
        }
      }, {
        // Other model options go here
    });
    UserSession.sync();
    return UserSession;
};

module.exports = UserSessionModel;