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
  getAllowLabel,
  getNewAttachment,
  getNewActivity,
  cloneTicket
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

function cloneTicket(ticket) {
  const newTicket = _.cloneDeep(ticket)
  newTicket.id = utilService.makeId()
  return newTicket
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

function getNewAttachment(src) {
  const srcType = utilService.srcType(src)
  const type = (srcType === 'img') ? 'img' : (srcType === 'video') ? 'video' : 'link'
  return {
    "id": utilService.makeId(),
    type,
    "src": src
  }
}

function _getMiniUser() {
  if (localLoggedInUser) {
    return {
      "_id": localLoggedInUser._id,
      "fullName": localLoggedInUser.fullName,
      "imgSrc": localLoggedInUser.imgSrc,
    }
  } else return {
    "_id": 'Guest',
    "fullName": 'Guest',
    "imgSrc": '',
  }
}

function getNewActivity(text, ticketId) {
  return {
    "id": utilService.makeId(),
    "txt": text,
    "createdAt": Date.now(),
    "ticketId": ticketId,
    "by": _getMiniUser()
  }
}

function getNewChecklist() {
  return {
    "id": utilService.makeId(),
    "title": "Checklist",
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
    "cover": true,
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