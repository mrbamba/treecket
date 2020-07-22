<template>
    <div class="board-details" v-if="currBoard">
        <!-- <main-header /> -->

        <header style="padding: 8px; color: #fff; font-weight: 500">
            <div>{{ currBoard.title }}</div>
            <!-- <input type="text" v-model="currBoard.title"> -->
        </header>

        <main
            class="groups-container"
            v-dragscroll:firstchilddrag.x
            v-on:dragscrollstart="toggleScrollCursor"
            v-on:dragscrollend="toggleScrollCursor"
        >
            <!-- :drop-placeholder="upperDropPlaceholderOptions" -->
            <Container
                drag-class="col-ghost"
                drop-class="col-ghost-drop"
                non-drag-area-selector=".add-ticket-btn"
                orientation="horizontal"
                @drop="onGroupDrop($event)"
                :get-child-payload="getGroupPayload"
            >
                <Draggable v-for="group in currBoard.groups" :key="group._id">
                    <ticket-group
                        :group="group"
                        @addTicket="addTicket"
                        @updateTickets="updateTickets"
                        @updateGroup="updateGroup"
                    />
                </Draggable>
                <add-group @addGroup="addGroup" />
            </Container>
        </main>

        <ticket-details
            v-if="selectedTicket"
            :ticket="selectedTicket"
            :groupId="selectedGroupId"
            :user="loggedInUser"
            :labels="currBoard.labels"
            :ticketActivities="ticketActivities"
            @closeTicketDetails="closeTicketDetails"
            @saveTicket="saveBoard"
            @deleteTicket="deleteTicket"
            @addActivity="addActivity"
        />
        <user-message v-if="userMessage" :userMessage="userMessage" />
    </div>
</template>

<script>
import TicketGroup from "@/components/board/TicketGroup.vue";
import AddGroup from "@/components/board/AddGroup.vue";
import TicketDetails from "@/components/board/TicketDetails.vue";
import MainHeader from "@/components/MainHeader.vue";
import UserMessage from '@/components/board/UserMessage.vue';

import { boardService } from "@/services/board.service.js";

import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "@/services/dnd.service.js";
import { dragscroll } from 'vue-dragscroll';
import SocketService from "@/services/socket.service.js";
import { eventBus } from '@/services/event-bus.service.js';

export default {
    data() {
        return {
            selectedTicket: null,
            selectedGroupId: null,

            // FAULT: Groups place-holders height are set to the tallest group
            // upperDropPlaceholderOptions: {
            //     className: "cards-drop-preview",
            //     animationDuration: "200",
            //     showOnTop: false
            // },
        };
    },
    async created() {
        await this.loadBoard();
        SocketService.setup();
        SocketService.emit("feed board", this.$route.params.boardId);
        SocketService.on("feed update", this.loadBoard);
        eventBus.$on('updateLabels', (label) => {
            let board = this.currBoard
            const labelIdx = board.labels.findIndex(currLabel => currLabel.id === label.id);
            if (labelIdx >= 0) board.labels.splice(labelIdx, 1, label);
            else {
                label = boardService.getAllowLabel(label)
                board.labels.push(label)
            }
            this.saveBoard();
        })
    },
    mounted() {
        window.onload = () => { console.log("It's loaded!") };
    },
    destoryed() {
        SocketService.off("feed update", this.$route.params.boardId);
        SocketService.terminate();
        this.$store.commit('setBoard', null)
    },
    methods: {
        async updateGroup(updatedGroup) {
            const newBoard = this.currBoard;
            const groupIdx = newBoard.groups.findIndex(
                group => group.id === updatedGroup.id
            );
            if (groupIdx < 0) return;

            newBoard.groups[groupIdx] = updatedGroup;
            await this.$store.dispatch("updateBoard", newBoard);
            SocketService.emit("updateBoard", this.currBoard._id);
        },
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
        },
        toggleScrollCursor(ev) {
            this.$el.style.cursor = (ev.type === 'dragscrollstart') ? 'ew-resize' : 'default';
        },
        addActivity({text,ticketId=null}){
            let newActivity=boardService.getNewActivity(text,ticketId)
            this.currBoard.activities.push(newActivity)
            this.saveBoard()
        }
    },
    computed: {
        userMessage() {
            return this.$store.getters.userMessage
        },
        currBoard() {
            return _.cloneDeep(this.$store.getters.currBoard);
        },
        loggedInUser() {
            console.log('asking for logged in user', this.$store.getters.loggedInUser)
            return this.$store.getters.loggedInUser;
        },
        ticketActivities() {
            return this.currBoard.activities.filter(activity=>activity.ticketId=== this.selectedTicket.id);
        }
    },
    components: {
        TicketGroup,
        TicketDetails,
        Container,
        Draggable,
        AddGroup,
        MainHeader,
        UserMessage,
    },
    directives: {
        dragscroll
    },
    watch: {
        async $route(to, from) {
            this.loadBoard();
        }
    }
}
</script>

<style>
</style>
