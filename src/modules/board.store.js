import { boardService } from "../services/board.service.js";

export default {
  state: {
    boards: [],
    currBoard: null,
    currTicket: null,
    filterBy: {
      txt: "",
    },
  },
  getters: {
    boards(state) {
      console.log(state.boards)
      return state.boards;
    },
    currBoard(state) {
      return state.currBoard;
    },
    currTicket(state) {
      return state.currTicket;
    }
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setBoard(state, { board }) {
      state.currBoard = board;
    },
    addBoard(state, { board }) {
      state.boards.push(board);
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setCurrTicket(state, { ticketId }) {
      state.currBoard.groups.find(group => state.currTicket = group.tickets.find(ticket => (ticket.id === ticketId)));
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
    async loadBoards({ commit }) {
      const boards = await boardService.query();
      commit({ type: 'setBoards', boards })
    },
    async loadBoard({ commit }, boardId) {
      const board = await boardService.getById(boardId);
      commit({ type: 'setBoard', board })
    },

    async addBoard({ commit, state }, board) {
      console.log('adding:', { board })
      await boardService.addBoard(board);
      commit({ type: 'addBoard', board });
    },

    async updateBoard({ commit }, board) {
      console.log({board})
      const newBoard = await boardService.update(board);
      console.log({newBoard})
      commit({ type: 'setBoard', board: newBoard });
    }
    

    // sendMsg(context, {msg}) {
    //     console.log('sending from store')
    //     socket.emit('sendMsg', msg)
    // },
    // getChatHistory(context, {chatId}) {
    //     socket.emit('getHistory', chatId)
    // }
  },
};
