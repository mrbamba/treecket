<template>
    <div class="board-details" v-if="currBoard">
        {{ currBoard.title }}
        <Container
            class="groups-container"
            orientation="horizontal"
            @drop="onGroupDrop($event)"
            :drop-placeholder="upperDropPlaceholderOptions"
            :get-child-payload="getGroupPayload"
        >
            <Draggable v-for="group in currBoard.groups" :key="group._id">
                <ticket-group
                    :group="group"
                    @addTicket="addNewTicket"
                    @updateTickets="updateTickets"
                />
            </Draggable>
        <div
            class=" ticket-group"
            @click="addNewGroup = true"
        >
            <span v-if="addNewGroup === false"> + Add column</span>
            <div v-if="addNewGroup">
                <input type="text" v-model="newGroupName" v-if="addNewGroup" />
                <div>
                    <button @click="addGroup">Add Section</button>
                    <button @click.stop="addNewGroup = false">X</button>
                </div>
            </div>
        </div>
        </Container>

        <ticket-details
            v-if="selectedTicket"
            :ticket="selectedTicket"
            :groupId="selectedGroupId"
            @closeTicketDetails="closeTicketDetails"
            @saveTicket="saveBoard"
            @deleteTicket="deleteTicket"
        />
    </div>
</template>

<script>
import TicketGroup from "@/components/board/TicketGroup.vue";
import TicketDetails from "@/components/board/TicketDetails.vue";
import { boardService } from "@/services/board.service.js";

import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "@/services/dnd.service.js";

export default {
    data() {
        return {
            selectedTicket: null,
            selectedGroupId: null,
            addNewGroup: false,
            newGroupName: "",

            upperDropPlaceholderOptions: {
                className: "cards-drop-preview",
                animationDuration: "150",
                showOnTop: true
            },
            dropPlaceholderOptions: {
                className: "drop-preview",
                animationDuration: "150",
                showOnTop: true
            }
            // board: null
        };
    },
    async created() {
        this.loadBoard();
    },
    methods: {
        closeTicketDetails() {
            this.selectedTicket = null;
            this.selectedGroupId = null;
            this.$router.push(`/board/${this.currBoard._id}`);
        },
        addNewTicket({ ticket, groupId }) {
            const board = this.currBoard;
            const currGroupIdx = board.groups.findIndex(
                group => group.id === groupId
            );
            board.groups[currGroupIdx].tickets.push(ticket);
            this.$store.dispatch("updateBoard", board);
        },
        deleteTicket({ ticketId, groupId }) {
            this.$store.dispatch("deleteTicket", { ticketId, groupId });
            this.closeTicketDetails();
        },
        saveBoard() {
            console.log("save board");
            this.$store.dispatch("updateBoard", this.currBoard);
        },
        updateTickets({ newTickets, groupId }) {
            const newBoard = this.currBoard;
            const groupIdx = newBoard.groups.findIndex(
                group => group.id === groupId
            );
            if (groupIdx < 0) return;

            newBoard.groups[groupIdx].tickets = newTickets;
            this.$store.dispatch("updateBoard", newBoard);
        },
        async loadBoard() {
            await this.$store.dispatch("loadBoard", this.$route.params.boardId);

            // Sets selectedTicket and selectedGroupId
            if (this.$route.params.ticketId) {
                this.selectedGroupId = this.currBoard.groups.find(
                    group =>
                        (this.selectedTicket = group.tickets.find(
                            ticket => ticket.id === this.$route.params.ticketId
                        ))
                ).id;
            }
        },
        onGroupDrop(dropResult) {
            const newGroups = applyDrag(this.currBoard.groups, dropResult);
            const newBoard = this.currBoard;
            newBoard.groups = newGroups;

            this.$store.dispatch("updateBoard", newBoard);
        },
        getGroupPayload(idx) {
            console.log("Group Payload!:", this.currBoard.groups[idx]);
            return this.currBoard.groups[idx];
        },
        addGroup() {
            if(!this.newGroupName)return;
            let updatedBorad = this.currBoard;
            let group = boardService.getNewGroup(this.newGroupName);
            this.newGroupName=''
            updatedBorad.groups.push(group);
            this.$store.dispatch("updateBoard", updatedBorad);
        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard;
        }
    },
    components: {
        TicketGroup,
        TicketDetails,
        Container,
        Draggable
    },
    watch: {
        async $route(to, from) {
            this.loadBoard();
        }
    }
};
</script>

<style>
</style>
