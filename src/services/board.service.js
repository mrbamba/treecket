import httpService from './http.service'
import utilService from './util.service'

export const boardService = {
    query,
    getById,
    update,
    getNewBoard,
    addBoard,
    getNewTicket
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

function getNewBoard(boardSettings) {
    return {
        "title": boardSettings.title,
        "background": boardSettings.background,
        "nextId": {
            "activities": 102,
            "labels": 102,
            "groups": 102,
            "tickets": 102
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
                                "id": 100,
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
                                "id": 100,
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
                                "id": 101,
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
                                "id": 100,
                                "src": "https://bla.blabla.com/shmulik.jpg",
                                "type": "img"
                            },
                            {
                                "id": 101,
                                "src": "https://bla.blabla.com/",
                                "type": "link"
                            },
                            {
                                "id": 102,
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


///////////////////////
// export const boardService = {
//     query
// }

// function query(filterBy){
//     const board = {     
//         _id: "qeovinerv",
//         name:"FrontEnd",
//         members: [
//             {
//                 _id: "u101",
//                 "fullName": "user2",
//                 "imgSrc": "img//user/img2"
//             }
//         ],
//         groups: [
//             {
//                 id: "col101",
//                 name: "QA",
//                 color: "#fff",
//                 tickets: [
//                     {
//                         id: "ewfibuv35",
//                         boardId: "b1234567",
//                         title: "Do QA",
//                         description: "Check the code",
//                         status: "s101",
//                         color: "#fff",
//                         members: [
//                             {
//                                 _id: "u101",
//                                 fullName: "user1",
//                                 imgSrc: "img//user/img1"
//                             },
//                             {
//                                 _id: "u101",
//                                 fullName: "user2",
//                                 imgSrc: "img//user/img2"
//                             }
//                         ],
//                         labels: [
//                             "l101",
//                             "l102"
//                         ],
//                         createdAt: 1234567890,
//                         by: {
//                             _id: "u101",
//                             fullName: "user1",
//                             imgSrc: "img//user/img1"
//                         },
//                         comments: [
//                             {
//                                 by: {
//                                     id: "u101",
//                                     fullName: "user1",
//                                     imgSrc: "img//user/img1"
//                                 },
//                                 txt: "Need to push this to next sprint",
//                                 createdAt: 1234567890
//                             }
//                         ],
//                         checklists: [
//                             {
//                                 title: "UX",
//                                 items: [
//                                     {
//                                         txt: "some to do",
//                                         isDone: true
//                                     },
//                                     {
//                                         txt: "some to do",
//                                         isDone: false
//                                     }
//                                 ]
//                             },
//                             {
//                                 title: "Backend",
//                                 items: [
//                                     {
//                                         txt: "some to do",
//                                         isDone: true
//                                     },
//                                     {
//                                         txt: "some to do",
//                                         isDone: false
//                                     }
//                                 ]
//                             }
//                         ],
//                         attachments: [
//                             {
//                                 src: "https://bla.blabla.com/shmulik.jpg",
//                                 type: "img"
//                             },
//                             {
//                                 src: "https://bla.blabla.com/",
//                                 type: "link"
//                             },
//                             {
//                                 src: "https://bla.blabla.com/",
//                             type: "video"
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 id: "col102",
//                 name: "Debug",
//                 color: "#fff",
//                 tickets: [
//                     {
//                         id: "ewfibuv36",
//                         boardId: "b1234567",
//                         title: "Do Anything",
//                         description: "blalala",
//                         status: "s101",
//                         color: "#fff",
//                         members: [
//                             {
//                                 _id: "u101",
//                                 fullName: "user1",
//                                 imgSrc: "img//user/img1"
//                             },
//                             {
//                                 _id: "u101",
//                                 fullName: "user2",
//                                 imgSrc: "img//user/img2"
//                             }
//                         ],
//                         labels: [
//                             "l101",
//                             "l102"
//                         ],
//                         createdAt: 1234567890,
//                         by: {
//                             _id: "u101",
//                             fullName: "user1",
//                             imgSrc: "img//user/img1"
//                         },
//                         comments: [
//                             {
//                                 by: {
//                                     id: "u101",
//                                     fullName: "user1",
//                                     imgSrc: "img//user/img1"
//                                 },
//                                 txt: "Need to push this to next sprint",
//                                 createdAt: 1234567890
//                             }
//                         ],
//                         checklists: [
//                             {
//                                 title: "UX",
//                                 items: [
//                                     {
//                                         txt: "some to do",
//                                         isDone: true
//                                     },
//                                     {
//                                         txt: "some to do",
//                                         isDone: false
//                                     }
//                                 ]
//                             },
//                             {
//                                 title: "Backend",
//                                 items: [
//                                     {
//                                         txt: "some to do",
//                                         isDone: true
//                                     },
//                                     {
//                                         txt: "some to do",
//                                         isDone: false
//                                     }
//                                 ]
//                             }
//                         ],
//                         attachments: [
//                             {
//                                 src: "https://bla.blabla.com/shmulik.jpg",
//                                 type: "img"
//                             },
//                             {
//                                 src: "https://bla.blabla.com/",
//                                 type: "link"
//                             },
//                             {
//                                 src: "https://bla.blabla.com/",
//                             type: "video"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ],
//         labels: [
//             {
//                 id: "l101",
//                 color: "4a4",
//                 name: "UX"
//             }
//         ],
//         activity: [
//             {
//                 _id: "4tgunng",
//                 text: "Tal edited ticket 234876 title",
//                 createdAt: 1234567890,
//                 ticketId: "4tbg2354f",
//                 by: {
//                     _id: "u101",
//                     fullName: "user1",
//                     imgSrc: "img//user/img1"
//                 }
//             }
//         ],
//     }
//     return board
// }
