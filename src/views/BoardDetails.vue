<template>
    <div class="board-details" v-if="currBoard" :style="{ background }">
        <board-header :user="loggedInUser" />
        <board-controls
            :boardTitle="currBoard.title"
            :boardMembers="currBoard.members"
            :systemUsers="systemUsers"
            :board="currBoard"
            @updateBoardTitle="updateBoardTitle"
            @loadUsers="loadUsers"
            @toggleMember="toggleMember"
            @showDashboard="show.dashboard=true"
            @showMenu="show.menu=!show.menu"
        />

        <main
            class="groups-container"
            v-dragscroll:firstchilddrag.x
            v-on:dragscrollstart="toggleScrollCursor"
            v-on:dragscrollend="toggleScrollCursor"
        >
            <Container
                drag-class="col-ghost"
                drop-class="col-ghost-drop"
                non-drag-area-selector=".add-ticket-btn"
                orientation="horizontal"
                @drop="onGroupDrop($event)"
                :get-child-payload="getGroupPayload"
                drag-handle-selector=".ticket-group-header"
            >
                <Draggable v-for="(group, groupIdx) in currBoard.groups" :key="group._id">
                    <ticket-group
                        :group="group"
                        :labels="currBoard.labels"
                        :showFullLabels="show.fullLabel"
                        :groupIdx="groupIdx"
                        @addTicket="addTicket"
                        @updateTickets="updateTickets"
                        @updateGroup="updateGroup"
                        @changeLabelsDisplay="changeLabelsDisplay"
                        @cloneGroup="cloneGroup"
                        @deleteGroup="deleteGroup"
                        @deleteTicket="deleteTicket"
                    />
                </Draggable>
            </Container>
            <add-group @addGroup="addGroup" />
        </main>

        <transition name="slide-up">
            <ticket-details
                v-if="selectedTicket"
                :ticket="selectedTicket"
                :ticketIdx="selectedTicketIdx"
                :groupId="selectedGroupId"
                :user="loggedInUser"
                :boardMembers="currBoard.members"
                :labels="currBoard.labels"
                :ticketActivities="ticketActivities"
                :boardGroupsSummary="boardGroupsSummary"
                :currGroupSummary="currGroupSummary"
                @closeTicketDetails="closeTicketDetails"
                @saveTicket="saveBoard"
                @deleteTicket="deleteTicket"
                @addActivity="addActivity"
                @cloneTicket="cloneTicket"
                @moveTicket="moveTicket"
            />
        </transition>
        <dashboard
            :board="currBoard"
            v-if="show.dashboard && currBoard"
            @closeDashboard="show.dashboard=false"
        />

        <user-message v-if="userMessage" :userMessage="userMessage" />
        <transition name="slide-left">
            <board-menu
                :activities="reverseChronolgicalActivities"
                :boardId="currBoard._id"
                :boardBackground ="currBoard.background"
                @editBackground="show.backgroundEditor=!show.backgroundEditor"
                @setBackground="setBackground"
                @closeBoardMenu="show.menu = false"
                v-if="show.menu"
            />
        </transition>
    </div>
</template>

<script>
import BoardHeader from "@/components/board/BoardHeader.vue";
import BoardControls from "@/components/board/BoardControls.vue";
import TicketGroup from "@/components/board/TicketGroup.vue";
import AddGroup from "@/components/board/AddGroup.vue";
import TicketDetails from "@/components/board/TicketDetails.vue";
import UserMessage from '@/components/board/UserMessage.vue';
import Dashboard from '@/components/board/Dashboard.vue';
import BoardMenu from '@/components/board/BoardMenu.vue';



import { boardService } from "@/services/board.service.js";

import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "@/services/dnd.service.js";
import { dragscroll } from 'vue-dragscroll';
import SocketService from "@/services/socket.service.js";
import { eventBus } from '@/services/event-bus.service.js';

export default {
    data() {
        return {
            show: {
                dashboard: false,
                fullLabel: false,
                menu: false,
                backgroundEditor: false
            },
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
            this.addActivity(`Added a new ticket`, ticket.id)

            await this.$store.dispatch("updateBoard", board);
            SocketService.emit("updateBoard", this.currBoard._id);
        },
        async deleteTicket({ ticketId, groupId }) {
            console.log({ ticketId, groupId })
            const groupIdx = this.currBoard.groups.findIndex(group => group.id === groupId);
            const ticketIdx = this.currBoard.groups[groupIdx].tickets.findIndex(ticket => ticket.id === ticketId);
            if (groupIdx < 0 || ticketIdx < 0) return;
            console.log('got here?')
            this.currBoard.groups[groupIdx].tickets.splice(ticketIdx, 1);
            this.addActivity(`deleted a ticket`)
            this.saveBoard()
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
            return this.currBoard.groups[idx];
        },
        async addGroup(newGroupName) {
            // this.addActivity(`${this.loggedInUser.fullName} added a new group`)
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
            this.addActivity(`Changed the board name to ${title}`)
            this.saveBoard()
        },
        addActivity(text, ticketId = null) {
            console.log(text)

            let newActivity = boardService.getNewActivity(text, ticketId);
            console.log(newActivity)
            this.currBoard.activities.push(newActivity);
        },
        changeLabelsDisplay() {
            this.show.fullLabel = !this.show.fullLabel;
        },
        cloneTicket(ticket, ticketIdx, groupId) {
            this.addActivity(`Cloned a ticket`, ticket.id)

            const newTicket = boardService.cloneTicket(ticket);
            const groupIdx = this.currBoard.groups.findIndex(
                group => group.id === groupId
            );
            if (groupIdx < 0) return;
            this.currBoard.groups[groupIdx].tickets.splice(ticketIdx, 0, newTicket);
            this.saveBoard();
        },
        cloneGroup(group, groupIdx) {
            this.addActivity(`Cloned group ${group.title}`)

            const newGroup = boardService.cloneGroup(group);
            this.currBoard.groups.splice(groupIdx, 0, newGroup)
            this.saveBoard()
        },
        deleteGroup(groupIdx) {
            this.addActivity(`Deleted group ${this.currBoard.groups[groupIdx].title}`)

            this.currBoard.groups.splice(groupIdx, 1)
            this.saveBoard()
        },
        loadUsers(userFilterBy) {

            this.$store.dispatch("loadUsers", userFilterBy);

        },
        toggleMember(memberToUpdate) {
            delete memberToUpdate.email
            const memberIdx = this.currBoard.members.findIndex(member => member._id === memberToUpdate._id)
            if (memberIdx >= 0) {
                this.currBoard.members.splice(memberIdx, 1)
                this.addActivity(`Removed ${memberToUpdate.fullName} from board`)

            } else {
                this.currBoard.members.push(memberToUpdate)
                this.addActivity(`Added ${memberToUpdate.fullName} to board`)
            }

            this.saveBoard();
        },
        setBackground(background) {
            this.addActivity(`Changed the board background`)
            this.currBoard.background = background
            this.saveBoard();
        },

        moveTicket(newGroupId) {
            const currGroupIdx = this.currBoard.groups.findIndex(
                group => group.tickets.find(ticket => {
                    return ticket.id === this.selectedTicket.id
                })
            );
            if (currGroupIdx < 0) return

            const currTicketIdx = this.currBoard.groups[currGroupIdx].tickets.findIndex(ticket => {
                return ticket.id === this.selectedTicket.id
            }
            )
            if (currTicketIdx < 0) return

            const newGroupIdx = this.currBoard.groups.findIndex(
                group => { return group.id === newGroupId })
            if (newGroupIdx < 0) return
            this.addActivity(`Moved ${this.selectedTicket.title} from ${this.currBoard.groups[currGroupIdx].title} to ${this.currBoard.groups[newGroupIdx].title}`,this.selectedTicket.id)

            let ticketBackup = _.cloneDeep(this.selectedTicket)
            this.currBoard.groups[currGroupIdx].tickets.splice(currTicketIdx, 1)
            this.currBoard.groups[newGroupIdx].tickets.unshift(ticketBackup)
            this.saveBoard();
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
            return _.cloneDeep(this.currBoard.activities.filter(activity => activity.ticketId === this.selectedTicket.id).reverse());
        },
        systemUsers() {
            return this.$store.getters.users
        },
        boardGroupsSummary() {
            let groupsSummary = [];
            let board = _.cloneDeep(this.currBoard);
            board.groups.forEach(group => {
                groupsSummary.push({
                    id: group.id,
                    title: group.title
                })
            });
            return groupsSummary;
        },
        currGroupSummary() {
            let board = _.cloneDeep(this.currBoard)
            let currTicketGroup = board.groups.find(group => {
                return group.tickets.find(ticket => {
                    return ticket.id === this.selectedTicket.id
                })
            })
            return {
                id: currTicketGroup.id,
                title: currTicketGroup.title
            }

        },
        reverseChronolgicalActivities(){
            return _.cloneDeep(this.currBoard.activities.reverse())
        }
    },
    components: {
        BoardHeader,
        BoardControls,
        Container,
        Draggable,
        TicketGroup,
        AddGroup,
        TicketDetails,
        UserMessage,
        Dashboard,
        BoardMenu,

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
