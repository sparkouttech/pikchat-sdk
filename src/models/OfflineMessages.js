
const Sequelize = require('sequelize');

const OfflineMesaageModel = (sequelize) => {
    const OfflineMesaage = sequelize.define('pikchat_offline_messages', {
        // Model attributes are defined here
        senderId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        receiverId: {
          type: Sequelize.STRING
          // allowNull defaults to true
        },
        messageType: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        message: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        messageStatus : {
            type: Sequelize.STRING
        },
        status : {
            type: Sequelize.STRING
        },
        messageTime : {
            type: Sequelize.STRING
        },
    },{ // extra params 
    });
    OfflineMesaage.sync();
    return OfflineMesaage;
}

module.exports = OfflineMesaageModel;