import httpService from './http.service';
import utilService from './util.service';

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
  cloneTicket,
  cloneGroup
};

function query(filterBy) {
  return httpService.get('board');
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`);
}

function update(board) {
  return httpService.put(`board/${board._id}`, board);
}

function addBoard(board) {
  return httpService.post(`board`, board);
}

function cloneTicket(ticket) {
  return utilService.cloneObj(ticket)
}

function cloneGroup(group) {
  return utilService.cloneObj(group)
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
  label.id = utilService.makeId();
  return label;
}

function getNewAttachment(src) {
  const srcType = utilService.srcType(src);
  const type = (srcType === 'img') ? 'img' : (srcType === 'video') ? 'video' : 'link';
  return {
    "id": utilService.makeId(),
    type,
    "src": src
  };
}

function _getMiniUser() {
  if (localLoggedInUser) {
    return {
      "_id": localLoggedInUser._id,
      "fullName": localLoggedInUser.fullName,
      "imgSrc": localLoggedInUser.imgSrc,
    };
  } else return {
    "_id": 'Guest',
    "fullName": 'Guest',
    "imgSrc": 'http://res.cloudinary.com/dkdsymsli/image/upload/v1595713140/dklfuu3fq5kcng4qqpfv.png',
  };
}

function getNewActivity(text, ticketId) {
  return {
    "id": utilService.makeId(),
    "txt": text,
    "createdAt": Date.now(),
    "ticketId": ticketId,
    "by": _getMiniUser()
  };
}

function getNewChecklist() {
  return {
    "id": utilService.makeId(),
    "title": "Checklist",
    "items": []
  };
}

function getNewChecklistItem(txt) {
  return {
    "id": utilService.makeId(),
    "txt": txt,
    "isDone": false
  };
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
    "by": _getMiniUser(),
    "comments": [],
    "checklists": [],
    "attachments": []
  };
}

function getNewGroup(title) {
  return {
    "id": utilService.makeId(),
    "title": title,
    "color": "#eeeeee",
    "tickets": []
  };
}

function getNewBoard(prefs) {
  return {
    "title": prefs.title,
    "background": prefs.background,
    "createdAt": Date.now(),
    "members": [],
    "labels": [
      {
        "id": utilService.makeId(),
        "color": "",
        "title": ""
      },
      {
        "id": utilService.makeId(),
        "color": "#F2D600",
        "title": ""
      },
      {
        "id": utilService.makeId(),
        "color": "#FF9F1A",
        "title": ""
      },
      {
        "id": utilService.makeId(),
        "color": "#EB5A46",
        "title": ""
      },
      {
        "id": utilService.makeId(),
        "color": "#C377E0",
        "title": ""
      },
      {
        "id": utilService.makeId(),
        "color": "#0079BF",
        "title": ""
      }
    ],
    "activities": [],
    "groups": [
      {
        "id": utilService.makeId(),
        "title": "To Do",
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
