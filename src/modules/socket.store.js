import socket from "@/services/socket.service.js";

export default {
    state: {
        
    },
    getters: {
        
    },
    mutations: {

    },
    actions: {
        sendUpdateBoardMsg(context, {msg}) {
            console.log('sending from store')
            socket.emit('sendMsg', msg)
        },
        // getChatHistory(context, {chatId}) {
        //     socket.emit('getHistory', chatId)
        // }
    }
}