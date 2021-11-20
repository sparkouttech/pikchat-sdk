
const events = require('./events');

const disconnect = require('./events/disconnect');
const MessageDelivered = require('./events/MessageDelivered');
const NewConnection = require('./events/NewConnection');
const SingleChatMessage = require('./events/SingleChatMessage');

/**
 * 
 * @param {*} data 
 */
const EventHandler = (data) => {

    const { io, socket, models } = data;
    const { userId, accessToken, apiKey, sessionId } = socket.handshake.query;

    NewConnection(data);
    
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
    socket.on(events.SINGLE_CHAT_MESSAGE, (message) => {
        data.message = message;
        SingleChatMessage(data);
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
}


module.exports = EventHandler;