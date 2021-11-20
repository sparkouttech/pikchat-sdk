
const { Server } = require("socket.io");
const { Sequelize } = require('sequelize');

const CONSTANTS = require('./src/constants');

// Models injection
const UserModel = require('./src/models/User');
const MessageModel = require('./src/models/Messages');
const OfflineMesaageModel = require('./src/models/OfflineMessages');
const UserSessionModel = require('./src/models/UserSessions');

const EventHandler = require('./src/EventHandler');

/**
 *  Pikchat
 */
const config = [];

config[CONSTANTS.MODELS] = [];
config[CONSTANTS.CORS_ORIGIN] = 'http://localhost:4200';

config[CONSTANTS.MYSQL_HOST] = 'localhost';
config[CONSTANTS.MYSQL_USERNAME] = 'root';
config[CONSTANTS.MYSQL_PASSWORD] = 'root';
config[CONSTANTS.MYSQL_DATABASE] = 'spark_chat';

config[CONSTANTS.SEQUELIZE] = CONSTANTS.NULL;


/**
 * 
 * @param {*} KEY 
 * @param {*} VALUE 
 */
const setConfig = (KEY, VALUE) => {
    config[KEY] = VALUE;
};

/**
 * 
 */
const connectMySQL = async () => {
    config[CONSTANTS.SEQUELIZE] = new Sequelize(config[CONSTANTS.MYSQL_DATABASE], config[CONSTANTS.MYSQL_USERNAME], config[CONSTANTS.MYSQL_PASSWORD], {
        host: config[CONSTANTS.MYSQL_HOST],
        dialect: 'mysql',
    }, {logging: false});
    try {
        await config[CONSTANTS.SEQUELIZE].authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        config[CONSTANTS.SEQUELIZE] = NULL;
    }
};

/**
 * 
 * @returns 
 */
const registerModels = () => {
    config[CONSTANTS.MODELS][CONSTANTS.USER] = UserModel(config[CONSTANTS.SEQUELIZE]);
    config[CONSTANTS.MODELS][CONSTANTS.MESSAGE] = MessageModel(config[CONSTANTS.SEQUELIZE]);
    config[CONSTANTS.MODELS][CONSTANTS.OFFLINE_MESSAGE] = OfflineMesaageModel(config[CONSTANTS.SEQUELIZE]);
    config[CONSTANTS.MODELS][CONSTANTS.USER_SESSION] = UserSessionModel(config[CONSTANTS.SEQUELIZE]);
    return true;
};

/**
 * 
 * @param {http || https object} server 
 */
const startPikchatEngine = async (server) => {
    const SERVER_OPTIONS = {
        cors: {
          origin: config[CONSTANTS.CORS_ORIGIN],
          methods: [CONSTANTS.GET, CONSTANTS.POST]
        }
    };
    /**
     *  Register models on sdk start
     */
    registerModels();
    try {
        /**
         * Event initializer
         */
        if (typeof server.listeners !== CONSTANTS.UNDEFINED) { 
            const io = new Server(server, SERVER_OPTIONS);

            io.use((socket, next) => {
                const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;
                if (userId == undefined || accessToken == undefined || apiKey == undefined || sessionId == undefined) {
                    next(new Error("Keys userId, accessToken, apiKey, sessionId required"));
                } else {
                    next();
                }                
            }); 

            io.on(CONSTANTS.CONNECTION, (socket) => {
                console.log(`A new user connected ${socket.id}`);
                const data = {
                    io: io,
                    socket: socket,
                    models: config[CONSTANTS.MODELS]
                }
                EventHandler(data);
            });
        } else {
            console.error('Pass valid http object');
        }
        
    } catch (error) {
        console.log(error);
    }
}

const pikchat = {
    CONSTANTS,
    setConfig,
    connectMySQL,
    startPikchatEngine
};

/**
 * 
 */
module.exports = pikchat;