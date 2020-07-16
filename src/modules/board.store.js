import { boardService } from "../services/board.service.js";

export default {
  state: {
    boards: [],
    currBoard: {},
    filterBy: {
      txt: "",
    },
  },
  getters: {
    board(state) {
      return state.board;
    },
  },
  mutations: {
    addBoard(state, { board }) {
      state.boards.push(board);
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setBoard(state, { board }) {
      state.board = board;
    },
    removeTicket(state, { id }) {
      const ticketIndex = state.board.group.ticket.findIndex(
        currTicket => currTicket.id === id
      );
      state.board.group.ticket.splice(ticketIndex, 1);
    },
    updateTicket(state, { ticket }) {
      const ticketIndex = state.board.group.ticket.findIndex(
        (currTicket) => currTicket.id === ticket.id
      );
      state.board.group.ticket.splice(ticketIndex, 1, ticket);
    },
    addTicket(state, { ticket }) {
      state.board.group.ticket.push(ticket);
    },
  },
  actions: {
    async loadBoard({ commit, state }) {
      const board = await boardService.query(state.filterBy);
      await commit({type: 'setBoard', board})
    },
    // sendMsg(context, {msg}) {
    //     console.log('sending from store')
    //     socket.emit('sendMsg', msg)
    // },
    // getChatHistory(context, {chatId}) {
    //     socket.emit('getHistory', chatId)
    // }
  },
};
