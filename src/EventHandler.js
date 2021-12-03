
const events = require('./events');

const disconnect = require('./events/disconnect');
const GetMessage = require('./events/GetMessage');
const GetOfflineMessage = require('./events/GetOfflineMessage');
const MessageDelivered = require('./events/MessageDelivered');
const NewConnection = require('./events/NewConnection');
const SingleChatMessage = require('./events/SingleChatMessage');
const SingleChatMessageValidationSchema = require('./validations/single-chat-send-message');

/**
 * 
 * @param {*} data 
 */
const EventHandler = (data) => {

    const { io, socket, models } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    NewConnection(data);
    GetOfflineMessage(data);
    
    /**
     * if user disconnected from socket server
     */
    socket.on(events.DISCONNECT, () => {
        console.log(`A user disconnected ${socket.id}`);
        disconnect(data);
    });
    /**
     * 
     */
    socket.on(events.SINGLE_CHAT_MESSAGE, async (message) => {
        const { error } = await SingleChatMessageValidationSchema.validate(message);

        if (error == undefined) {
            data.message = message;
            SingleChatMessage(data);
        } else {
            throwValidationError(socket, events.SINGLE_CHAT_MESSAGE, error);
        }
    });

    /**
     * 
     */
    socket.on(events.SINGLE_CHAT_MESSAGE_DELIVERED, (message) => {
        data.message = message;
        MessageDelivered(data);
    });
    /**
     * 
     */
    socket.on(events.SINGLE_CHAT_MESSAGE_READ, (message) => {
        data.message = message;
        MessageDelivered(data);
    });
    /**
     * 
     */
     socket.on(events.GET_MESSAGES, (message) => {
        data.message = message;
        GetMessage(data);
    });

    socket.on('CLOSE_CONNECTION', function(){
        socket.disconnect(true);
    });
}

/**
 * 
 * @param {*} socket 
 * @param {*} eventName 
 * @param {*} error 
 */
const throwValidationError = (socket, eventName, error) => {
    socket.emit('VALIDATION_ERROR',{
        event : eventName,
        error : error,
        message : String(error.details[0].message)
    });
};

module.exports = EventHandler;