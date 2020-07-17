<template>
    <div class="board-details">
        {{ getBoard.title }}
        <div class="groups-container">
        <ticket-group
            v-for="group in getBoard.groups"
            :key="group._id"
            :group="group"
            @openTicket="openTicket"
            @addTicket="addNewTicket"
        />
        </div>
        <ticket-details v-if="openingTicket" :ticket="openingTicket" @closeTicket="closeTicket"
        @ticketSaved="saveBoard" />
    </div>
</template>

<script>
import TicketGroup from "@/components/board/TicketGroup.vue";
import TicketDetails from "@/views/TicketDetails.vue";
export default {
    data() {
        return {
            openingTicket: null
        };
    },

    computed: {
        getBoard() {
            const board = this.$store.getters.currBoard;
            return board;
        }
    },

    created() {
        this.$store.dispatch("loadBoard", this.$route.params.id);
    },

    methods: {
        openTicket(ticket) {
            this.openingTicket = ticket;
        },

        closeTicket(){
            this.openingTicket = null
        },

        addNewTicket({ ticket, groupId }) {
            const board = this.$store.getters.currBoard
            const currGroupIdx = board.groups.findIndex(group => group.id === groupId);
            board.groups[currGroupIdx].tickets.push(ticket)
            this.$store.dispatch('updateBoard', board);
        },

        saveBoard(){
            console.log('save board');
        }
    },
    components: {
        TicketGroup,
        TicketDetails
    }
};
</script>

<style>
</style>
