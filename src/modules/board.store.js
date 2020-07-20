import { boardService } from "../services/board.service.js";
export default {
  state: {
    overlay: false, // consider misc.store.js or locate in global store (index.js)
    boards: [],
    currBoard: null,
    filterBy: {
      txt: ""
    },
  },
  getters: {
    boards(state) {
      return state.boards;
    },
    currBoard(state) {
      return state.currBoard;
    },

    overlay(state) {
      return state.overlay;
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
    addTicket(state, { ticket }) {
      state.board.group.ticket.push(ticket);
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },

    showOverlay(state) {
      state.overlay = true;
    },
    hideOverlay(state) {
      state.overlay = false;
    }
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
    async updateBoard({ commit, state }, board) {
      // SAVE BOARD COPY
      // const boardCopy = _.cloneDeep(state.board);
      commit({ type: 'setBoard', board });
      try {
        await boardService.update(board);
      } catch (err) {
        console.log('ERROR IN UPDATE BOARD (STORE):', err)
        // APPLY COPIED BOARD
        // commit({ type: 'setBoard', board: boardCopy });
      }

    },
    async deleteTicket({ state, commit }, { ticketId, groupId }) {
      var updatedBoard = _.cloneDeep(state.currBoard)
      const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId);
      const ticketIdx = updatedBoard.groups[groupIdx].tickets.findIndex(ticket => ticket.id === ticketId);
      if (groupIdx < 0 || ticketIdx < 0) return;

      updatedBoard.groups[groupIdx].tickets.splice(ticketIdx, 1);
      updatedBoard = await boardService.update(updatedBoard);
      commit({ type: 'setBoard', board: updatedBoard });
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
