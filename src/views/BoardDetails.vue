<template>
  <div>
    <ticket-group v-for="group in board.groups" :key="group._id" :group="group"></ticket-group>
  </div>
</template>

<script>
import ticketGroup from "../components/board/TicketGroup.vue";
export default {
  data() {
    return {
      board: {
            _id: "qeovinerv",
            name:"FrontEnd",
            members: [
                {
                    _id: "u101",
                    "fullName": "user2",
                    "imgSrc": "img//user/img2"
                }
            ],
            "groups": [
                {
                    "id": "col101",
                    "name": "QA",
                    "color": "#fff"
                }
            ],
            "labels": [
                {
                    "id": "l101",
                    "color": "4a4",
                    "name": "UX"
                }
            ],
            "activity": [
                {
                    "_id": "4tgunng",
                    "text": "Tal edited ticket 234876 title",
                    "createdAt": 1234567890,
                    "ticketId": "4tbg2354f",
                    "by": {
                        "_id": "u101",
                        "fullName": "user1",
                        "imgSrc": "img//user/img1"
                    }
                }
            ],
            "ticket": [
                {
                    "_id": "ewfibuv35",
                    "boardId": "b1234567",
                    "title": "",
                    "description": "",
                    "status": "s101",
                    "color": "#fff",
                    "members": [
                        {
                            "_id": "u101",
                            "fullName": "user1",
                            "imgSrc": "img//user/img1"
                        },
                        {
                            "_id": "u101",
                            "fullName": "user2",
                            "imgSrc": "img//user/img2"
                        }
                    ],
                    "labels": [
                        "l101",
                        "l102"
                    ],
                    "createdAt": 1234567890,
                    "by": {
                        "_id": "u101",
                        "fullName": "user1",
                        "imgSrc": "img//user/img1"
                    },
                    "comments": [
                        {
                            "by": {
                                "id": "u101",
                                "fullName": "user1",
                                "imgSrc": "img//user/img1"
                            },
                            "txt": "Need to push this to next sprint",
                            "createdAt": 1234567890
                        }
                    ],
                    "checklists": [
                        {
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
                            "src": "https://bla.blabla.com/shmulik.jpg",
                            "type": "img"
                        },
                        {
                            "src": "https://bla.blabla.com/",
                            "type": "link"
                        },
                        {
                            "src": "https://bla.blabla.com/",
                            "type": "video"
                        }
                    ]
                }
            ]
        }
    };
  },

  created() {},

  components: {
    ticketGroup
  }
};
</script>

<style>
</style>