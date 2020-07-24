<template>
    <div class="board-details" v-if="currBoard" :style="{ background }">
        <main-header />
        <board-header :boardTitle="currBoard.title" :boardMembers="currBoard.members" @updateBoardTitle="updateBoardTitle" />

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
                <Draggable v-for="(group, groupIdx) in currBoard.groups" :key="group._id">
                    <ticket-group
                        :group="group"
                        :labels="currBoard.labels"
                        :showFullLabels="showFullLabel"
                        :groupIdx="groupIdx"
                        @addTicket="addTicket"
                        @updateTickets="updateTickets"
                        @updateGroup="updateGroup"
                        @changeLabelsDisplay="changeLabelsDisplay"
                        @cloneGroup="cloneGroup"
                        @deleteGroup="deleteGroup"
                    />
                </Draggable>
            </Container>
            <add-group @addGroup="addGroup" />
        </main>

        <transition name="pop-up-fade" mode="out-in">
            <ticket-details
                v-if="selectedTicket"
                :ticket="selectedTicket"
                :ticketIdx="selectedTicketIdx"
                :groupId="selectedGroupId"
                :user="loggedInUser"
                :boardMembers="currBoard.members"
                :labels="currBoard.labels"
                :ticketActivities="ticketActivities"
                @closeTicketDetails="closeTicketDetails"
                @saveTicket="saveBoard"
                @deleteTicket="deleteTicket"
                @addActivity="addActivity"
                @cloneTicket="cloneTicket"
            />
        </transition>

        <user-message v-if="userMessage" :userMessage="userMessage" />
    </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import BoardHeader from "@/components/board/BoardHeader.vue";
import TicketGroup from "@/components/board/TicketGroup.vue";
import AddGroup from "@/components/board/AddGroup.vue";
import TicketDetails from "@/components/board/TicketDetails.vue";
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
            showFullLabel: false,
            selectedTicket: null,
            selectedTicketIdx: null,
            selectedGroupId: null,

            // NOTICE: Height of groups place-holders are set to the tallest group
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
            let board = this.currBoard;
            const labelIdx = board.labels.findIndex(currLabel => currLabel.id === label.id);
            if (labelIdx >= 0) board.labels.splice(labelIdx, 1, label);
            else {
                label = boardService.getAllowLabel(label);
                board.labels.push(label);
            }
            this.saveBoard();
        })
    },
    mounted() {
        window.onload = () => { console.log("BoardDetails + background loaded") };
    },
    destoryed() {
        SocketService.off("feed update", this.$route.params.boardId);
        SocketService.terminate();
        this.$store.commit('setBoard', null);
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
            this.selectedTicketIdx = null
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
            // await this.$store.dispatch("deleteTicket", { ticketId, groupId });

            const groupIdx = this.currBoard.groups.findIndex(group => group.id === groupId);
            const ticketIdx = this.currBoard.groups[groupIdx].tickets.findIndex(ticket => ticket.id === ticketId);
            if (groupIdx < 0 || ticketIdx < 0) return;

            this.currBoard.groups[groupIdx].tickets.splice(ticketIdx, 1);
            this.saveBoard();
        },
        async saveBoard() {
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
                            (ticket, idx) => {
                                this.selectedTicketIdx = idx
                                return ticket.id === this.$route.params.ticketId
                            }
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
        updateBoardTitle(title) {
            this.currBoard.title = title;
            this.saveBoard();
        },
        addActivity({ text, ticketId = null }) {
            let newActivity = boardService.getNewActivity(text, ticketId);
            this.currBoard.activities.push(newActivity);
            this.saveBoard();
        },
        changeLabelsDisplay() {
            this.showFullLabel = !this.showFullLabel;
        },
        cloneTicket(ticket, ticketIdx, groupId) {
            const newTicket = boardService.cloneTicket(ticket);
            const groupIdx = this.currBoard.groups.findIndex(
                group => group.id === groupId
            );
            if (groupIdx < 0) return;
            this.currBoard.groups[groupIdx].tickets.splice(ticketIdx, 0, newTicket);
            this.saveBoard();
        },
        cloneGroup(group, groupIdx) {
            const newGroup = boardService.cloneGroup(group);
            this.currBoard.groups.splice(groupIdx, 0, newGroup)
            this.saveBoard()
        },
        deleteGroup(groupIdx) {
            this.currBoard.groups.splice(groupIdx, 1)
            this.saveBoard()
        } 
    },
    computed: {
        background() {
            if (this.$route.params.boardId) {
                const board = this.currBoard;
                if (board) {
                    return board.background + ((board.background.includes('url')) ? ' fixed' : '');
                }
                return '';
            }
        },
        userMessage() {
            return this.$store.getters.userMessage
        },
        currBoard() {
            return _.cloneDeep(this.$store.getters.currBoard);
        },
        loggedInUser() {
            return this.$store.getters.loggedInUser;
        },
        ticketActivities() {
            return this.currBoard.activities.filter(activity => activity.ticketId === this.selectedTicket.id);
        }
    },
    components: {
        MainHeader,
        BoardHeader,
        TicketGroup,
        TicketDetails,
        Container,
        Draggable,
        AddGroup,
        UserMessage,
        BoardHeader,
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
