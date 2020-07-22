import httpService from './http.service'
import utilService from './util.service'

var localLoggedInUser = null;
if (sessionStorage.user) localLoggedInUser = JSON.parse(sessionStorage.user);

export const boardService = {
  query,
  getById,
  update,
  getNewBoard,
  addBoard,
  getNewTicket,
  getNewGroup,
  getNewChecklist,
  getNewChecklistItem,
  getNewComment,
  getAllowLabel
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

function getNewComment(commentText) {

  return {
    "id": utilService.makeId(),
    "txt": commentText,
    "createdAt": Date.now(),
    "by": _getMiniUser(),
  }

}

function getAllowLabel(label) {
  label.id = utilService.makeId()
  return label
}

function _getMiniUser() {
  if(localLoggedInUser){

    return {
      "_id": localLoggedInUser._id,
      "fullName": localLoggedInUser.fullName,
      "imgSrc": localLoggedInUser.imgSrc,
    }
  }else return{
    "_id": 'anonymous',
      "fullName": 'Anonymous',
      "imgSrc": '',
  }
}

function getNewChecklist() {
  return {
    "id": utilService.makeId(),
    "title": "Logo Settings",
    "items": []
  }
}

function getNewChecklistItem(txt) {
  return {
    "id": utilService.makeId(),
    "txt": txt,
    "isDone": false
  }
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

function getNewGroup(title) {
  return {
    "id": utilService.makeId(),
    "title": title,
    "color": "#eeeeee",
    "tickets": []
  }
}

function getNewBoard(prefs) {
  return {
    // "_id": utilService.makeId(), // board._id will be created by mongoDB (TO DELETE)
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
