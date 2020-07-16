import httpService from './http.service'

export const boardService = {
  query,
  getById,
  update,
  getEmptyBoard,
  addBoard,
};

function query(filterBy) {
    return httpService.get('board',filterBy)
}

function getById(boardId){
    return httpService.get(`board/${boardId}`)
}

function update(board){
    return httpService.put(`board/${board._id}`,board)
}

async function addBoard(board){
    return await httpService.post(`board`,board)
}

function getEmptyBoard(){
    return {
        "_id": "qeovinerv",
        "name": "FrontEnd",
        "background": "#fff",
        "nextId":{
            "activities":102,
            "labels":102,
            "groups":102,
            "tickets":102
        },
        "members": [
            {
                "_id": "dfverwli3g43",
                "fullName": "user2",
                "imgSrc": "img//user/img2"
            }
        ],
        "labels": [
            {
                "id": 100,
                "color": "4a4",
                "name": "UX"
            }
        ],
        "activities": [
            {
                "id": 100,
                "txt": "Tal edited ticket 234876 title",
                "createdAt": 1234567890,
                "ticketId": "4tbg2354f",
                "by": {
                    "_id": "u101",
                    "fullName": "user1",
                    "imgSrc": "img//user/img1"
                }
            }
        ],
        "groups": [
            {
                "id": 100,
                "name": "QA",
                "color": "#fff",
                "tickets": [
                    {
                        "id": 100,
                        "title": "",
                        "description": "",
                        "color": "#fff",
                        "members": [
                            {
                                "_id": 100,
                                "fullName": "user1",
                                "imgSrc": "img//user/img1"
                            },
                            {
                                "_id": 101,
                                "fullName": "user2",
                                "imgSrc": "img//user/img2"
                            }
                        ],
                        "labels": [
                            101,
                            102
                        ],
                        "createdAt": 1234567890,
                        "by": {
                            "_id": 100,
                            "fullName": "user1",
                            "imgSrc": "img//user/img1"
                        },
                        "comments": [
                            {
                                "id":100,
                                "txt": "Need to push this to next sprint",
                                "createdAt": 1234567890,
                                "by": {
                                    "_id": "u101",
                                    "fullName": "user1",
                                    "imgSrc": "img//user/img1"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id":100,
                                "title": "UX",
                                "items": [
                                    {
                                        "txt": "some to do",
                                        "isDone": true
                                    },
                                    {
                                        "txt": "some to do",
                                        "isDone": false
                                    }
                                ]
                            },
                            {
                                "id":101,
                                "title": "Backend",
                                "items": [
                                    {
                                        "txt": "some to do",
                                        "isDone": true
                                    },
                                    {
                                        "txt": "some to do",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "attachments": [
                            {
                                "id":100,
                                "src": "https://bla.blabla.com/shmulik.jpg",
                                "type": "img"
                            },
                            {
                                "id":101,
                                "src": "https://bla.blabla.com/",
                                "type": "link"
                            },
                            {
                                "id":102,
                                "src": "https://bla.blabla.com/",
                                "type": "video"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
