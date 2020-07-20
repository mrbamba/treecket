<template>
    <div class="board-details" v-if="currBoard" style="{width: fit-content}">
        <main-header />
        {{ currBoard.title }}
        <Container
            non-drag-area-selector=".add-ticket-btn"
            class="groups-container"
            orientation="horizontal"
            @drop="onGroupDrop($event)"
            :drop-placeholder="upperDropPlaceholderOptions"
            :get-child-payload="getGroupPayload"
        >
            <Draggable class="ticket-group-container" v-for="group in currBoard.groups" :key="group._id">
                <ticket-group
                    :group="group"
                    @addTicket="addTicket"
                    @updateTickets="updateTickets"
                />
            </Draggable>
            <add-group @addGroup="addGroup" />
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
import AddGroup from "@/components/board/AddGroup.vue";
import TicketDetails from "@/components/board/TicketDetails.vue";
import MainHeader from "@/components/MainHeader.vue";
import { boardService } from "@/services/board.service.js";

import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "@/services/dnd.service.js";
import SocketService from "@/services/socket.service.js";

export default {
    data() {
        return {
            selectedTicket: null,
            selectedGroupId: null,

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
        SocketService.setup();
        SocketService.emit("feed board", this.$route.params.boardId);
        SocketService.on("feed update", this.loadBoard);
    },
    destoryed() {
        SocketService.off("feed update", this.$route.params.boardId);
        SocketService.terminate();
    },
    methods: {
        closeTicketDetails() {
            this.selectedTicket = null;
            this.selectedGroupId = null;
            this.$router.push(`/board/${this.currBoard._id}`);
        },
        async addTicket({ ticket, groupId }) {
            const board = this.currBoard;
            const currGroupIdx = board.groups.findIndex(
                group => group.id === groupId
            );
            board.groups[currGroupIdx].tickets.push(ticket);
            await this.$store.dispatch("updateBoard", board);
            SocketService.emit("updateBoard", this.currBoard._id);
        },
        async deleteTicket({ ticketId, groupId }) {
            this.closeTicketDetails();
            await this.$store.dispatch("deleteTicket", { ticketId, groupId });
            SocketService.emit("updateBoard", this.currBoard._id);
        },
        async saveBoard() {
            console.log("save board");
            await this.$store.dispatch("updateBoard", this.currBoard);
            SocketService.emit("updateBoard", this.currBoard._id);
        },
        async updateTickets({ newTickets, groupId }) {
            const newBoard = this.currBoard;
            const groupIdx = newBoard.groups.findIndex(
                group => group.id === groupId
            );
            if (groupIdx < 0) return;

            newBoard.groups[groupIdx].tickets = newTickets;
            await this.$store.dispatch("updateBoard", newBoard);
            SocketService.emit("updateBoard", this.currBoard._id);
        },
        async loadBoard() {
            console.log("running loadBoard on boardDetails");
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
        async onGroupDrop(dropResult) {
            const newGroups = applyDrag(this.currBoard.groups, dropResult);
            const newBoard = this.currBoard;
            newBoard.groups = newGroups;

            await this.$store.dispatch("updateBoard", newBoard);
            SocketService.emit("updateBoard", this.currBoard._id);
        },
        getGroupPayload(idx) {
            console.log("Group Payload!:", this.currBoard.groups[idx]);
            return this.currBoard.groups[idx];
        },
        async addGroup(newGroupName) {
            let updatedBoard = this.currBoard;
            let group = boardService.getNewGroup(newGroupName);
            updatedBoard.groups.push(group);
            await this.$store.dispatch("updateBoard", updatedBoard);
            SocketService.emit("updateBoard", this.currBoard._id);
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
        Draggable,
        AddGroup,
        MainHeader
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
