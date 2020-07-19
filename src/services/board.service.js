import httpService from './http.service'
import utilService from './util.service'

export const boardService = {
    query,
    getById,
    update,
    getNewBoard,
    addBoard,
    getNewTicket,
    getNewGroup
};

function query(filterBy) {
    return httpService.get('board')
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

function update(board) {
    return httpService.put(`board/${board._id}`, board);
}

function addBoard(board) {
    return httpService.post(`board`, board)
}

function getNewTicket(title) {
    return {
        "id": utilService.makeId(),
        "title": title,
        "description": "",
        "color": "#fff",
        "members": [],
        "labels": [],
        "createdAt": Date.now(),
        "by": {},
        "comments": [],
        "checklists": [],
        "attachments": []
    }
}

function getNewGroup(title){
  return{
          "id": utilService.makeId(),
          "title":title,
          "color": "#eeeeee",
          "tickets":[]
  }
}

function getNewBoard(prefs) {
    return {
        "_id": utilService.makeId(), // board._id will be created by mongoDB (TO DELETE)
        "title": prefs.title,
        "background": prefs.background,
        "members": [],
        "labels": [
          {
            "id": utilService.makeId(),
            "color": "#44aa44",
            "title": ""
          },
          {
            "id": utilService.makeId(),
            "color": "#ee7777",
            "title": ""
          }
        ],
        "activities": [],
        "groups": [
          {
            "id": utilService.makeId(),
            "title": "To do",
            "color": "#eeeeee",
            "tickets": []
          },
          {
            "id": utilService.makeId(),
            "title": "In Progress",
            "color": "#eeeeee",
            "tickets": []
          },
          {
            "id": utilService.makeId(),
            "title": "Done",
            "color": "#eeeeee",
            "tickets": []
          }
        ]
      }
}
