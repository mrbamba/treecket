<template>
    <div class="board-details" v-if="board">
        {{ board.title }}
        <div class="groups-container">
            <ticket-group
                v-for="group in board.groups"
                :key="group._id"
                :group="group"
                @addTicket="addNewTicket"
            />
        </div>
        <ticket-details
            v-if="selectedTicket"
            :ticket="selectedTicket"
            :groupId="selectedGroupId"
            @toggleTicketDetails="toggleTicketDetails"
            @saveTicket="saveBoard"
            @deleteTicket="deleteTicket"
        />
    </div>
</template>

<script>
import TicketGroup from "@/components/board/TicketGroup.vue";
import TicketDetails from "@/components/board/TicketDetails.vue";
export default {
    data() {
        return {
            selectedTicket: null,
            selectedGroupId: "",
            board: null
        };
    },
    async created() {
        // await this.$store.dispatch("loadBoard", this.$route.params.boardId);
        this.loadBoard();
        // this.toggleTicketDetails({ ticket: this.selectedTicket, groupId: this.selectedGroupId });
    },
    methods: {
        toggleTicketDetails({ ticket, groupId }) {
            this.selectedTicket = ticket;
            this.selectedGroupId = groupId;
        },
        addNewTicket({ ticket, groupId }) {
            const board = this.$store.getters.currBoard;
            const currGroupIdx = board.groups.findIndex(
                group => group.id === groupId
            );
            board.groups[currGroupIdx].tickets.push(ticket);
            this.$store.dispatch("updateBoard", board);
        },

        deleteTicket({ ticketId, groupId }) {
            const board = this.$store.getters.currBoard;
            const currGroupIdx = board.groups.findIndex(
                group => group.id === groupId
            );
            board.groups[currGroupIdx].tickets.splice(ticketId, 1);
            this.$store.dispatch("updateBoard", board);
        },

        saveBoard() {
            console.log("save board");
            this.$store.dispatch('updateBoard', this.board);
            this.loadBoard();
        },
        async loadBoard() {
            await this.$store.dispatch("loadBoard", this.$route.params.boardId);
            this.board = _.cloneDeep(this.$store.getters.currBoard);
            if (this.$route.params.ticketId) {
                this.board.groups.find(group =>
                    this.selectedTicket = group.tickets.find(ticket =>
                        ticket.id === this.$route.params.ticketId));
                console.log(this.selectedTicket)
                this.toggleTicketDetails({ ticket: this.selectedTicket, groupId: this.selectedGroupId });
            }
        }
    },
    components: {
        TicketGroup,
        TicketDetails
    },
    watch: {
        async '$route'(to, from) {
            // await this.$store.dispatch("loadBoard", this.$route.params.boardId);
            this.loadBoard();

            // if (this.$route.params.ticketId) {
            //     this.board.groups.find(group =>
            //         this.selectedTicket = group.tickets.find(ticket =>
            //             ticket.id === this.$route.params.ticketId));
            //     console.log(this.selectedTicket)
            //     this.toggleTicketDetails({ ticket: this.selectedTicket, groupId: this.selectedGroupId });
            // }
        }
    }
};
</script>

<style>
</style>
