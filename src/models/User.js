
const Sequelize = require('sequelize');

const UserModel = (sequelize) => {
    const User = sequelize.define('pikchat_users', {
        // Model attributes are defined here
        userId: {
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
    User.sync();
    return User;
};

module.exports = UserModel;