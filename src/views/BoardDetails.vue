<template>
    <div class="board-details" v-if="board">
        {{ board.title }}
        <div class="groups-container">
            <ticket-group
                v-for="group in board.groups"
                :key="group._id"
                :group="group"
                @openTicket="toggleTicketDetails"
                @addTicket="addNewTicket"
            />
        </div>
        <ticket-details
            v-if="selectedTicket"
            :ticket="selectedTicket"
            :groupId="selectedGroupId"
            @closeTicket="toggleTicketDetails"
            @ticketSaved="saveBoard"
            @deleteTicket="deleteTicket"
        />
    </div>
</template>

<script>
import TicketGroup from "@/components/board/TicketGroup.vue";
import TicketDetails from "@/views/TicketDetails.vue";
export default {
    data() {
        return {
            selectedTicket: null,
            selectedGroupId: "",
            board: null
        };
    },
    async created() {
        await this.$store.dispatch("loadBoard", this.$route.params.id);
        this.loadBoard();
    },

    methods: {
        toggleTicketDetails({ ticket, groupId }) {
            this.selectedGroupId = groupId;
            this.selectedTicket = ticket;
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
        },
        loadBoard() {
            this.board = _.cloneDeep(this.$store.getters.currBoard);
        }
    },
    components: {
        TicketGroup,
        TicketDetails
    },
    watch:{
        async '$route'(to, from){
            await this.$store.dispatch("loadBoard", this.$route.params.id);
            this.loadBoard();
        }
    }
};
</script>

<style>
</style>
