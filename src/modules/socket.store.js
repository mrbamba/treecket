import socket from "@/services/socket.service.js";
import utilService from '../services/util.service.js';

var localSocketSession = {};
if(sessionStorage.socketSession){ 
    localSocketSession = JSON.parse(sessionStorage.socketSession)
}else{
    localSocketSession={id:utilService.makeId()}
    console.log({localSocketSession})
    sessionStorage.setItem('socketSession', JSON.stringify(localSocketSession))
} 
export default {
    state: {
        socketId:localSocketSession,
    },
    getters: {
        socketId(state){
            return state.socketId
        }
        
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