<template>
    <section class="dashboard">
        <button @click="closeDashboard" class="close-dashboard-btn">
            <i class="fas fa-times" />
        </button>
        <h2>Dashboard</h2>
        <div class="top-data">
            <div class="total-tickets-count">Total tickets count {{ticketsCount}}</div>
            <div class="total-board-members-count">Total board members count {{board.members.length}}</div>
            <div class="board-created-at">Board created {{board.createdAt|formatTime}}</div>
            <div class="total-board-activities">Total board activities {{board.activities.length}}</div>
            <div class="total-comments">Total comments{{commentCount}}</div>
        </div>
        <div class="chart-section-one">
            <tickets-per-member class="tickets-per-member-chart" :board="board" />
            <tickets-per-group class="tickets-per-group-chart" :board="board" />
        </div>
        <tickets-by-week :board="board" />
    </section>
</template>

<script>
import TicketsPerGroup from '@/components/board/charts/TicketsPerGroup.vue';
import TicketsByWeek from '@/components/board/charts/TicketsByWeek';
import TicketsPerMember from '@/components/board/charts/TicketsPerMember';

export default {
    name: "Dashboard",
    props: {
        board: {
            type: Object,
            require: true
        },
    },
    methods: {
        closeDashboard() {
            this.$emit('closeDashboard')
        },
    },
    computed: {
        ticketsCount() {
            let tickets = 0
            this.board.groups.forEach(group => {
                group.tickets.forEach(ticket => {
                    tickets++
                });
            });
            return tickets
        },
        commentCount(){
            let commentsCount = 0
            this.board.groups.forEach(group => {
                group.tickets.forEach(ticket => {
                    ticket.comments.forEach(comment=>{
                        commentsCount++
                    })
                    
                });
            });
            return commentsCount;
        }
    },
    components: {
        TicketsPerGroup,
        TicketsByWeek,
        TicketsPerMember,
    }
}
</script>

<style>
</style>