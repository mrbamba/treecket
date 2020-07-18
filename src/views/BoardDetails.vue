<template>
    <div class="board-details" v-if="currBoard">
        {{ currBoard.title }}
        <div class="groups-container">
            <ticket-group
                v-for="group in currBoard.groups"
                :key="group._id"
                :group="group"
                @addTicket="addNewTicket"
            />
        </div>
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
export default {
    data() {
        return {
            selectedTicket: null,
            selectedGroupId: null,
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
            this.$store.dispatch("deleteTicket", { ticketId, groupId });
            this.closeTicketDetails();
            this.$router.push(`/board/${this.board._id}`)
        },
         saveBoard() {
            console.log("save board");
            this.$store.dispatch('updateBoard', this.board);
            // this.loadBoard();
        },
        async loadBoard() {
            await this.$store.dispatch("loadBoard", this.$route.params.boardId);
            this.board = _.cloneDeep(this.$store.getters.currBoard);

            // Sets selectedTicket and selectedGroupId
            if (this.$route.params.ticketId) {
                this.selectedGroupId = this.board.groups.find(group =>
                    this.selectedTicket = group.tickets.find(ticket => ticket.id === this.$route.params.ticketId)).id;
            }
        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard;
        },
        // currTicket(){

        // }
    },
    components: {
        TicketGroup,
        TicketDetails
    },
    watch: {
        async '$route'(to, from) {
            this.loadBoard();
        }
    }
};
</script>

<style>
</style>
