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
            socket.emit('sendMsg', msg)
        },
        // getChatHistory(context, {chatId}) {
        //     socket.emit('getHistory', chatId)
        // }
    }
}