
const Sequelize = require('sequelize');

const MessageModel = (sequelize) => {
    const Message = sequelize.define('pikchat_messages', {
        // Model attributes are defined here
        senderId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        receiverId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        messageType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
        messageStatus : {
            type: Sequelize.STRING
        },
        status: {
          type: Sequelize.STRING,
        },
        sentAt: {
          type: Sequelize.STRING,
        },
        deliveredAt: {
          type: Sequelize.STRING,
        },
        readAt: {
          type: Sequelize.STRING,
        },
      }, { // Other model options go here

    });
    Message.sync();
    return Message;
}

module.exports = MessageModel;